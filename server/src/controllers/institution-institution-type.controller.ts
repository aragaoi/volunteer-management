import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Institution,
  InstitutionType,
} from '../models';
import {InstitutionRepository} from '../repositories';

export class InstitutionInstitutionTypeController {
  constructor(
    @repository(InstitutionRepository)
    public institutionRepository: InstitutionRepository,
  ) { }

  @get('/institutions/{id}/institution-type', {
    responses: {
      '200': {
        description: 'InstitutionType belonging to Institution',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InstitutionType)},
          },
        },
      },
    },
  })
  async getInstitutionType(
    @param.path.string('id') id: typeof Institution.prototype.id,
  ): Promise<InstitutionType> {
    return this.institutionRepository.institutionType(id);
  }
}
