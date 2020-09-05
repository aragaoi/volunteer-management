import {repository,} from '@loopback/repository';
import {getModelSchemaRef, param, post, requestBody,} from '@loopback/rest';
import {User, UserEvaluation,} from '../models';
import {UserRepository} from '../repositories';
import {inject, service} from "@loopback/core";
import {EvaluationService} from "../services";
import {authenticate} from "@loopback/authentication";
import {authorize} from "@loopback/authorization";
import {SecurityBindings, UserProfile} from "@loopback/security";
import {LoginService} from "../services/login.service";

@authenticate('jwt')
export class UserUserEvaluationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @service(LoginService) protected loginService: LoginService,
    @service(EvaluationService) protected evaluationService: EvaluationService,
  ) {
  }

  @authorize({allowedRoles: ["ADMIN", "ENTITY"]})
  @post('/users/{id}/evaluations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserEvaluation)}},
      },
    },
  })
  async create(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserEvaluation, {
            title: 'NewUserEvaluationInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userEvaluation: Omit<UserEvaluation, 'id'>,
  ): Promise<UserEvaluation> {
    this.loginService.validateIdConsistency(userEvaluation.entityId, currentLogin);

    const result = await this.userRepository.evaluations(id).create(userEvaluation);

    const userEvaluations = await this.userRepository.evaluations(id).find({
      fields: {rating: true}
    });

    const averageRating = this.evaluationService.calculateAverageRating(userEvaluations);
    await this.userRepository.updateById(id, {rating: averageRating});
    return result;
  }
}
