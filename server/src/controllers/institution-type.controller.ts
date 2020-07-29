import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {InstitutionType} from '../models';
import {InstitutionTypeRepository} from '../repositories';

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

  @get('/institution-types/count', {
    responses: {
      '200': {
        description: 'InstitutionType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(InstitutionType) where?: Where<InstitutionType>,
  ): Promise<Count> {
    return this.institutionTypeRepository.count(where);
  }

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

  @get('/institution-types/{id}', {
    responses: {
      '200': {
        description: 'InstitutionType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InstitutionType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InstitutionType, {exclude: 'where'}) filter?: FilterExcludingWhere<InstitutionType>
  ): Promise<InstitutionType> {
    return this.institutionTypeRepository.findById(id, filter);
  }

  @patch('/institution-types/{id}', {
    responses: {
      '204': {
        description: 'InstitutionType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstitutionType, {partial: true}),
        },
      },
    })
      institutionType: InstitutionType,
  ): Promise<void> {
    await this.institutionTypeRepository.updateById(id, institutionType);
  }

  @put('/institution-types/{id}', {
    responses: {
      '204': {
        description: 'InstitutionType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() institutionType: InstitutionType,
  ): Promise<void> {
    await this.institutionTypeRepository.replaceById(id, institutionType);
  }

  @del('/institution-types/{id}', {
    responses: {
      '204': {
        description: 'InstitutionType DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.institutionTypeRepository.deleteById(id);
  }
}
