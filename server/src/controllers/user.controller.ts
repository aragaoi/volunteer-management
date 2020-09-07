import {Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, requestBody,} from '@loopback/rest';
import {User} from '../models';
import {isEmpty} from 'lodash';
import {UserRepository} from '../repositories';
import {genSalt, hash} from "bcryptjs";
import {authenticate} from "@loopback/authentication";
import {authorize} from "@loopback/authorization";
import {inject, service} from "@loopback/core";
import {SecurityBindings, UserProfile} from "@loopback/security";
import {LoginService, ROLES} from "../services/login.service";

@authenticate('jwt')
@authorize({allowedRoles: ["ADMIN"]})
export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(LoginService)
    public loginService: LoginService,
  ) {
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
      user: Omit<User, 'id'>,
  ): Promise<User> {
    await this.validateUnique(user);
    delete user.evaluations;

    user.password = await hash(user.password, await genSalt());
    return this.userRepository.create(user);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find({
      ...filter, ...{
        include:
          [
            {
              relation: "evaluations",
              scope: {
                fields: {
                  id: true,
                  userId: true,
                  entityId: true,
                  visitId: true,
                  date: true,
                  rating: true,
                  comment: true
                },
                include: [{
                  relation: "entity",
                  scope: {
                    fields: {
                      id: true,
                      name: true,
                      avatarUrl: true
                    }
                  }
                }, {
                  relation: "visit",
                  scope: {
                    fields: {
                      id: true,
                      date: true,
                      period: true,
                    }
                  }
                }]
              }
            },
          ]
      }
    });
  }

  @authorize({allowedRoles: [ROLES.ADMIN, ROLES.USER]})
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    this.loginService.validateIdConsistency(id, currentLogin);

    return this.userRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ["ADMIN", "USER"]})
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @inject(SecurityBindings.USER) currentLogin: UserProfile,
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
      user: User,
  ): Promise<void> {
    this.loginService.validateIdConsistency(id, currentLogin);
    await this.validateUnique(user, id);

    delete user.evaluations;

    if (user.password) {
      user.password = await hash(user.password, await genSalt());
    }
    await this.userRepository.updateById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  private async validateUnique(user: Omit<User, "id">, id?: string) {
    let existings = await this.userRepository.find({where: {email: user.email}});
    existings = id ? existings.filter(existing => existing.id !== id) : existings;

    if (!isEmpty(existings)) {
      throw new HttpErrors.BadRequest("Já existe um usuário com esse email");
    }
  }
}
