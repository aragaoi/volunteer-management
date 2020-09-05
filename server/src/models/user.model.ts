import {Entity, hasMany, model, property} from '@loopback/repository';
import {UserEvaluation} from './user-evaluation.model';
import {InstitutionEvaluation} from './institution-evaluation.model';
import {UserCredentials} from "@loopback/authentication-jwt";

@model({
  settings: {
    strict: false,
    hiddenProperties: ['password'],
    scope: {
      order: "name ASC"
    },
  }
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    default: "USER"
  })
  role?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  avatarUrl?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  acceptsContact?: boolean;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'object',
  })
  address?: object;

  @hasMany(() => UserEvaluation)
  evaluations?: UserEvaluation[];

  @hasMany(() => InstitutionEvaluation)
  institutionEvaluations?: InstitutionEvaluation[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
