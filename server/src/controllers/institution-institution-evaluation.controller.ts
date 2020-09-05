import {repository,} from '@loopback/repository';
import {getModelSchemaRef, param, post, requestBody,} from '@loopback/rest';
import {Institution, InstitutionEvaluation,} from '../models';
import {InstitutionRepository} from '../repositories';
import {inject, service} from "@loopback/core";
import {EvaluationService} from "../services";
import {authenticate} from "@loopback/authentication";
import {authorize} from "@loopback/authorization";
import {SecurityBindings, UserProfile} from "@loopback/security";
import {LoginService} from "../services/login.service";

@authenticate('jwt')
export class InstitutionInstitutionEvaluationController {
  constructor(
    @repository(InstitutionRepository) protected institutionRepository: InstitutionRepository,
    @service(LoginService) protected loginService: LoginService,
    @service(EvaluationService) protected evaluationService: EvaluationService,
  ) {
  }

  @authorize({allowedRoles: ["ADMIN", "USER"]})
  @post('/institutions/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Institution model instance',
        content: {'application/json': {schema: getModelSchemaRef(InstitutionEvaluation)}},
      },
    },
  })
  async create(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
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
    this.loginService.validateIdConsistency(institutionEvaluation.userId, currentLogin);

    const result = await this.institutionRepository.evaluations(id).create(institutionEvaluation);

    const institutionEvaluations = await this.institutionRepository.evaluations(id).find({
      fields: {rating: true}
    });

    const averageRating = this.evaluationService.calculateAverageRating(institutionEvaluations);
    await this.institutionRepository.updateById(id, {rating: averageRating});
    return result;
  }
}
