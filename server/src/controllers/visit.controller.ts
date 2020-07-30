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
import {Visit} from '../models';
import {VisitRepository} from '../repositories';

export class VisitController {
  constructor(
    @repository(VisitRepository)
    public visitRepository : VisitRepository,
  ) {}

  @post('/visits', {
    responses: {
      '200': {
        description: 'Visit model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visit)}},
      },
    },
  })
  async create(
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
    return this.visitRepository.create(visit);
  }

  @get('/visits/count', {
    responses: {
      '200': {
        description: 'Visit model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Visit) where?: Where<Visit>,
  ): Promise<Count> {
    return this.visitRepository.count(where);
  }

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
    @param.filter(Visit) filter?: Filter<Visit>,
  ): Promise<Visit[]> {
    return this.visitRepository.find(filter);
  }

  @patch('/visits', {
    responses: {
      '200': {
        description: 'Visit PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visit, {partial: true}),
        },
      },
    })
    visit: Visit,
    @param.where(Visit) where?: Where<Visit>,
  ): Promise<Count> {
    return this.visitRepository.updateAll(visit, where);
  }

  @get('/visits/{id}', {
    responses: {
      '200': {
        description: 'Visit model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Visit, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visit, {exclude: 'where'}) filter?: FilterExcludingWhere<Visit>
  ): Promise<Visit> {
    return this.visitRepository.findById(id, filter);
  }

  @patch('/visits/{id}', {
    responses: {
      '204': {
        description: 'Visit PATCH success',
      },
    },
  })
  async updateById(
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
    await this.visitRepository.updateById(id, visit);
  }

  @put('/visits/{id}', {
    responses: {
      '204': {
        description: 'Visit PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visit: Visit,
  ): Promise<void> {
    await this.visitRepository.replaceById(id, visit);
  }

  @del('/visits/{id}', {
    responses: {
      '204': {
        description: 'Visit DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitRepository.deleteById(id);
  }
}
