import {Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, requestBody,} from '@loopback/rest';
import {Address, Institution} from '../models';
import {InstitutionRepository} from '../repositories';
import {Geocoder} from "../services";
import {inject, service} from "@loopback/core";
import * as _ from "lodash";
import {getBoundsOfDistance} from 'geolib';
import {authorize} from '@loopback/authorization';
import {authenticate} from "@loopback/authentication";
import {SecurityBindings, UserProfile} from "@loopback/security";
import {LoginService, ROLES} from "../services/login.service";
import {isEmpty} from "lodash";
import {genSalt, hash} from "bcryptjs";

@authenticate('jwt')
@authorize({allowedRoles: ["ADMIN"]})
export class InstitutionController {
  constructor(
    @repository(InstitutionRepository)
    public institutionRepository: InstitutionRepository,
    @service(LoginService)
    public loginService: LoginService,
    @inject('services.Geocoder')
    protected geocoderService: Geocoder,
  ) {
  }

  @post('/institutions', {
    responses: {
      '200': {
        description: 'Institution model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Institution, {
              exclude: ["password"]
            })
          }
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institution, {
            title: 'NewInstitution',
            exclude: ['id'],
          }),
        },
      },
    })
      institution: Omit<Institution, 'id'>,
  ): Promise<Institution> {
    await this.validateUnique(institution);

    delete institution.evaluations;
    delete institution.role;

    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};
    institution.password = await hash(institution.password, await genSalt());

    return this.institutionRepository.create(institution);
  }

  @authenticate.skip()
  @authorize.skip()
  @get('/institutions', {
    responses: {
      '200': {
        description: 'Array of Institution model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Institution, {
                includeRelations: true,
                exclude: ["password"]
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Institution) filter?: Filter<Institution>,
    @param.query.number("latitude") latitude?: number,
    @param.query.number("longitude") longitude?: number,
    @param.query.string("address") address?: string,
    @param.query.number("distanceKm") distanceKm?: number,
  ): Promise<Institution[]> {
    if (!latitude || !longitude) {
      const geolocation = await this.findGeolocationFromText(address);
      latitude = (geolocation || {}).latitude;
      longitude = (geolocation || {}).longitude;
    }

    filter = this.addGeospatialFilter(filter, latitude, longitude, distanceKm);

    return this.institutionRepository.find({
      ...filter, ...{
        include:
          [
            {relation: "institutionType"},
            {
              relation: "evaluations",
              scope: {
                fields: {
                  id: true,
                  userId: true,
                  entityId: true,
                  visitId: true,
                  date: true,
                  rating: true,
                  comment: true
                },
                include: [{
                  relation: "user",
                  scope: {
                    fields: {
                      id: true,
                      name: true,
                      avatarUrl: true
                    }
                  }
                }]
              }
            },
          ]
      }
    });
  }

  @authorize({allowedRoles: ["ADMIN", "ENTITY"]})
  @get('/institutions/{id}', {
    responses: {
      '200': {
        description: 'Institution model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Institution, {
              includeRelations: true,
              exclude: ["password"]
            }),
          },
        },
      },
    },
  })
  async findById(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: string,
    @param.filter(Institution, {exclude: 'where'}) filter?: FilterExcludingWhere<Institution>,
  ): Promise<Institution> {
    this.loginService.validateIdConsistency(id, currentLogin);

    return this.institutionRepository.findById(id, {...filter, ...{include: [{relation: "institutionType"}]}});
  }

  @authorize({allowedRoles: ["ADMIN", "ENTITY"]})
  @patch('/institutions/{id}', {
    responses: {
      '204': {
        description: 'Institution PATCH success',
      },
    },
  })
  async updateById(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institution, {partial: true}),
        },
      },
    })
      institution: Institution,
  ): Promise<void> {
    this.loginService.validateIdConsistency(id, currentLogin);
    await this.validateUnique(institution, id);

    delete institution.institutionType;
    delete institution.evaluations;
    delete institution.role;

    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};

    if (institution.password) {
      institution.password = await hash(institution.password, await genSalt());
    }

    await this.institutionRepository.updateById(id, institution);
  }

  @del('/institutions/{id}', {
    responses: {
      '204': {
        description: 'Institution DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.institutionRepository.deleteById(id);
  }

  private addGeospatialFilter(filter?: Filter<Institution>, latitude?: number, longitude?: number, distanceKm?: number) {
    if (latitude && longitude && distanceKm) {
      let [minBound, maxBound] = getBoundsOfDistance(
        {latitude, longitude},
        distanceKm * 1000
      );

      filter = {
        ...filter, where: {
          ...(filter || {}).where,
          and: [
            {
              "address.latitude": {
                between: [
                  _.round(Number(minBound.latitude), 6),
                  _.round(Number(maxBound.latitude), 6)
                ]
              }
            },
            {
              "address.longitude": {
                between: [
                  _.round(Number(minBound.longitude), 6),
                  _.round(Number(maxBound.longitude), 6)
                ]
              }
            }
          ]
        }
      };
    }
    return filter;
  }

  async findGeolocation(address?: Address): Promise<{ latitude?: number, longitude?: number }> {
    let {street, city, state} = address || {};

    const query = [street, city, state].filter(Boolean).join(",");
    return await this.findGeolocationFromText(query);
  }

  private async findGeolocationFromText(query?: string) {
    let latitude, longitude;

    if (query && !_.isEmpty(query)) {
      const places = await this.geocoderService.geocode(query);

      if (!_.isEmpty(places)) {
        latitude = _.round(Number(places[0].lat), 6);
        longitude = _.round(Number(places[0].lon), 6);
      }
    }
    return {latitude, longitude};
  }

  private async validateUnique(institution: Omit<Institution, "id">, id?: string) {
    let existings = await this.institutionRepository.find({where: {email: institution.email}});
    existings = id ? existings.filter(existing => existing.id !== id) : existings;

    if (!isEmpty(existings)) {
      throw new HttpErrors.BadRequest("Já existe uma entidade com esse email");
    }
  }
}
