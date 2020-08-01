import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {InstitutionType} from './institution-type.model';
import {UserEvaluation} from './user-evaluation.model';
import {InstitutionEvaluation} from './institution-evaluation.model';

@model({
  settings: {
    strict: false,
    hiddenProperties: ['password'],
    scope: {
      order: "name ASC"
    }
  }
})
export class Institution extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  document: string;

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
    default: true
  })
  acceptsDonations?: boolean;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'object',
  })
  address?: object;

  @property({
    type: 'object',
  })
  calendar?: object;

  @belongsTo(() => InstitutionType)
  institutionTypeId: string;

  @hasMany(() => UserEvaluation, {keyTo: 'entityId'})
  userEvaluations: UserEvaluation[];

  @hasMany(() => InstitutionEvaluation, {keyTo: 'entityId'})
  evaluations: InstitutionEvaluation[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Institution>) {
    super(data);
  }
}

export interface InstitutionRelations {
  // describe navigational properties here
}

export type InstitutionWithRelations = Institution & InstitutionRelations;
