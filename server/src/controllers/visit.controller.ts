import {Filter, repository,} from '@loopback/repository';
import {get, getModelSchemaRef, param, patch, post, requestBody,} from '@loopback/rest';
import {Visit, VISIT_STATUSES} from '../models';
import {VisitRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";
import {authorize} from "@loopback/authorization";
import {inject, service} from "@loopback/core";
import {LoginService, ROLES} from "../services/login.service";
import {SecurityBindings, UserProfile} from "@loopback/security";
import { merge } from 'lodash';

@authenticate('jwt')
@authorize({allowedRoles: ["ADMIN"]})
export class VisitController {
  constructor(
    @repository(VisitRepository)
    public visitRepository: VisitRepository,
    @service(LoginService) protected loginService: LoginService,
  ) {
  }

  @authorize({allowedRoles: ["ADMIN", "USER"]})
  @post('/visits', {
    responses: {
      '200': {
        description: 'Visit model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visit)}},
      },
    },
  })
  async create(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visit, {
            title: 'NewVisit',
            exclude: ['id'],
          }),
        },
      },
    })
      visit: Omit<Visit, 'id'>,
  ): Promise<Visit> {
    this.loginService.validateIdConsistency(visit.userId, currentLogin);

    return this.visitRepository.create(visit);
  }

  @authorize({allowedRoles: ["ADMIN", "USER", "ENTITY"]})
  @get('/visits', {
    responses: {
      '200': {
        description: 'Array of Visit model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Visit, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.filter(Visit) filter?: Filter<Visit>,
  ): Promise<Visit[]> {
    const role = currentLogin.role;
    const filterByAuth = role === ROLES.ADMIN ? {} : {
      [role === ROLES.USER ? "userId" : "entityId"] : currentLogin.id
    };

    filter = merge(filter, {where: filterByAuth});

    return this.visitRepository.find({
      ...filter,
      ...{
        include: [
          {
            relation: "user",
            scope: {
              include:
                [
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
                        relation: "entity",
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
          }, {
            relation: "entity",
            scope: {
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
          }
        ]
      }
    });
  }

  @authorize({allowedRoles: ["ADMIN", "USER", "ENTITY"]})
  @patch('/visits/{id}', {
    responses: {
      '204': {
        description: 'Visit PATCH success',
      },
    },
  })
  async updateById(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visit, {partial: true}),
        },
      },
    })
      visit: Visit,
  ): Promise<void> {
    const fullVisit = await this.visitRepository.findById(id);
    const referenceId = fullVisit[currentLogin.role === ROLES.USER ? "userId" : "entityId"];
    this.loginService.validateIdConsistency(referenceId, currentLogin);

    if(
      [VISIT_STATUSES.CONFIRMED,VISIT_STATUSES.EVALUATION].includes(visit.status) &&
      (visit.evaluatedByEntity || fullVisit.evaluatedByEntity) &&
      (visit.evaluatedByUser || fullVisit.evaluatedByUser)
    ) {
      visit.status = VISIT_STATUSES.DONE;
    }

    await this.visitRepository.updateById(id, visit);
  }
}
