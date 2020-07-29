import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody,} from '@loopback/rest';
import {Institution} from '../models';
import {InstitutionRepository} from '../repositories';

export class InstitutionController {
  constructor(
    @repository(InstitutionRepository)
    public institutionRepository: InstitutionRepository,
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
  ): Promise<Institution[]> {
    return this.institutionRepository.find({...filter, ...{include: [{relation: "institutionType"}]}});
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
}
