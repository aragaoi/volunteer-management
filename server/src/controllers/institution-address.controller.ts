import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Institution,
  Address,
} from '../models';
import {InstitutionRepository} from '../repositories';

export class InstitutionAddressController {
  constructor(
    @repository(InstitutionRepository) protected institutionRepository: InstitutionRepository,
  ) { }

  @get('/institutions/{id}/address', {
    responses: {
      '200': {
        description: 'Institution has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.institutionRepository.address(id).get(filter);
  }

  @post('/institutions/{id}/address', {
    responses: {
      '200': {
        description: 'Institution model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Institution.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInInstitution',
            exclude: ['id'],
            optional: ['institutionId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.institutionRepository.address(id).create(address);
  }

  @patch('/institutions/{id}/address', {
    responses: {
      '200': {
        description: 'Institution.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.institutionRepository.address(id).patch(address, where);
  }

  @del('/institutions/{id}/address', {
    responses: {
      '200': {
        description: 'Institution.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.institutionRepository.address(id).delete(where);
  }
}
