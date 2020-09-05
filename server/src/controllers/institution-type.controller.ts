import {Count, CountSchema, Filter, repository, Where,} from '@loopback/repository';
import {get, getModelSchemaRef, param, patch, post, requestBody,} from '@loopback/rest';
import {InstitutionType} from '../models';
import {InstitutionTypeRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";
import {authorize} from "@loopback/authorization";

@authenticate('jwt')
@authorize({allowedRoles: ["ADMIN"]})
export class InstitutionTypeController {
  constructor(
    @repository(InstitutionTypeRepository)
    public institutionTypeRepository: InstitutionTypeRepository,
  ) {
  }

  @post('/institution-types', {
    responses: {
      '200': {
        description: 'InstitutionType model instance',
        content: {'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InstitutionType),
            },
          }},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(InstitutionType, {
              title: 'NewInstitutionTypes',
              exclude: ['id'],
            }),
          },
        },
      },
    })
      institutionTypes: (Omit<InstitutionType, 'id'>)[],
  ): Promise<InstitutionType[]> {
    return this.institutionTypeRepository.createAll(institutionTypes);
  }

  @authorize.skip()
  @get('/institution-types', {
    responses: {
      '200': {
        description: 'Array of InstitutionType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InstitutionType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InstitutionType) filter?: Filter<InstitutionType>,
  ): Promise<InstitutionType[]> {
    return this.institutionTypeRepository.find(filter);
  }

  @patch('/institution-types', {
    responses: {
      '200': {
        description: 'InstitutionType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstitutionType, {partial: true}),
        },
      },
    })
      institutionType: InstitutionType,
    @param.where(InstitutionType) where?: Where<InstitutionType>,
  ): Promise<Count> {
    return this.institutionTypeRepository.updateAll(institutionType, where);
  }
}
