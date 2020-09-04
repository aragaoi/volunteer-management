import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody,} from '@loopback/rest';
import {Address, Institution} from '../models';
import {InstitutionRepository} from '../repositories';
import {Geocoder} from "../services";
import {inject} from "@loopback/core";
import * as _ from "lodash";
import {getBoundsOfDistance} from 'geolib';

export class InstitutionController {
  constructor(
    @repository(InstitutionRepository)
    public institutionRepository: InstitutionRepository,
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
    delete institution.evaluations;

    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};

    return this.institutionRepository.create(institution);
  }

  @get('/institutions/count', {
    responses: {
      '200': {
        description: 'Institution model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Institution) where?: Where<Institution>,
  ): Promise<Count> {
    return this.institutionRepository.count(where);
  }

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
                }, {
                  relation: "visit",
                  scope: {
                    fields: {
                      id: true,
                      date: true,
                      period: true,
                    }
                  }
                }]
              }
            },
          ]
      }
    });
  }

  @patch('/institutions', {
    responses: {
      '200': {
        description: 'Institution PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institution, {partial: true}),
        },
      },
    })
      institution: Institution,
    @param.where(Institution) where?: Where<Institution>,
  ): Promise<Count> {
    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};

    return this.institutionRepository.updateAll(institution, where);
  }

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
    @param.path.string('id') id: string,
    @param.filter(Institution, {exclude: 'where'}) filter?: FilterExcludingWhere<Institution>
  ): Promise<Institution> {
    return this.institutionRepository.findById(id, {...filter, ...{include: [{relation: "institutionType"}]}});
  }

  @patch('/institutions/{id}', {
    responses: {
      '204': {
        description: 'Institution PATCH success',
      },
    },
  })
  async updateById(
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
    delete institution.institutionType;
    delete institution.evaluations;

    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};

    await this.institutionRepository.updateById(id, institution);
  }

  @put('/institutions/{id}', {
    responses: {
      '204': {
        description: 'Institution PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() institution: Institution,
  ): Promise<void> {
    let {latitude, longitude} = await this.findGeolocation((institution || {}).address);
    institution.address = {...institution.address, latitude, longitude};

    await this.institutionRepository.replaceById(id, institution);
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
        distanceKm*1000
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
}
