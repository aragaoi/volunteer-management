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
  InstitutionEvaluation,
} from '../models';
import {InstitutionRepository} from '../repositories';
import {service} from "@loopback/core";
import {EvaluationService} from "../services";

export class InstitutionInstitutionEvaluationController {
  constructor(
    @repository(InstitutionRepository) protected institutionRepository: InstitutionRepository,
    @service(EvaluationService) protected evaluationService: EvaluationService,
  ) { }

  @get('/institutions/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Array of Institution has many InstitutionEvaluation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InstitutionEvaluation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InstitutionEvaluation>,
  ): Promise<InstitutionEvaluation[]> {
    return this.institutionRepository.evaluations(id).find(filter);
  }

  @post('/institutions/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Institution model instance',
        content: {'application/json': {schema: getModelSchemaRef(InstitutionEvaluation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Institution.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstitutionEvaluation, {
            title: 'NewInstitutionEvaluationInInstitution',
            exclude: ['id'],
            optional: ['entityId']
          }),
        },
      },
    }) institutionEvaluation: Omit<InstitutionEvaluation, 'id'>,
  ): Promise<InstitutionEvaluation> {
    const institutionEvaluations = await this.institutionRepository.evaluations(id).find({
      fields: {rating: true}
    });

    const averageRating = this.evaluationService.calculateAverageRating(institutionEvaluations);

    await this.institutionRepository.updateById(id, {rating: averageRating});
    return this.institutionRepository.evaluations(id).create(institutionEvaluation);
  }

  @patch('/institutions/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Institution.InstitutionEvaluation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstitutionEvaluation, {partial: true}),
        },
      },
    })
    institutionEvaluation: Partial<InstitutionEvaluation>,
    @param.query.object('where', getWhereSchemaFor(InstitutionEvaluation)) where?: Where<InstitutionEvaluation>,
  ): Promise<Count> {
    return this.institutionRepository.evaluations(id).patch(institutionEvaluation, where);
  }

  @del('/institutions/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Institution.InstitutionEvaluation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InstitutionEvaluation)) where?: Where<InstitutionEvaluation>,
  ): Promise<Count> {
    return this.institutionRepository.evaluations(id).delete(where);
  }
}
