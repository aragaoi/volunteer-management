import {Count, CountSchema, Filter, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody,} from '@loopback/rest';
import {User, UserEvaluation,} from '../models';
import {UserRepository} from '../repositories';
import {service} from "@loopback/core";
import {EvaluationService} from "../services";

export class UserUserEvaluationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @service(EvaluationService) protected evaluationService: EvaluationService,
  ) { }

  @get('/users/{id}/evaluations', {
    responses: {
      '200': {
        description: 'Array of User has many UserEvaluation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserEvaluation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserEvaluation>,
  ): Promise<UserEvaluation[]> {
    return this.userRepository.evaluations(id).find(filter);
  }

  @post('/users/{id}/evaluations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserEvaluation)}},
      },
    },
  })
  async create(
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
    const result = await this.userRepository.evaluations(id).create(userEvaluation);

    const userEvaluations = await this.userRepository.evaluations(id).find({
      fields: {rating: true}
    });

    const averageRating = this.evaluationService.calculateAverageRating(userEvaluations);
    await this.userRepository.updateById(id, {rating: averageRating});
    return result;
  }

  @patch('/users/{id}/evaluations', {
    responses: {
      '200': {
        description: 'User.UserEvaluation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserEvaluation, {partial: true}),
        },
      },
    })
    userEvaluation: Partial<UserEvaluation>,
    @param.query.object('where', getWhereSchemaFor(UserEvaluation)) where?: Where<UserEvaluation>,
  ): Promise<Count> {
    return this.userRepository.evaluations(id).patch(userEvaluation, where);
  }

  @del('/users/{id}/evaluations', {
    responses: {
      '200': {
        description: 'User.UserEvaluation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserEvaluation)) where?: Where<UserEvaluation>,
  ): Promise<Count> {
    return this.userRepository.evaluations(id).delete(where);
  }
}
