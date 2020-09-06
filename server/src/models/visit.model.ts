import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {InstitutionEvaluation} from './institution-evaluation.model';
import {UserEvaluation} from './user-evaluation.model';
import {Institution} from './institution.model';
import {User} from './user.model';

export const VISIT_STATUSES = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
  EVALUATION: "EVALUATION",
  DONE: "DONE",
};

@model({settings: {strict: false}})
export class Visit extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  period: string;

  @property({
    type: 'boolean',
    default: false,
  })
  evaluatedByEntity: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  evaluatedByUser: boolean;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @hasOne(() => InstitutionEvaluation)
  entityEvaluation: InstitutionEvaluation;

  @hasOne(() => UserEvaluation)
  userEvaluation: UserEvaluation;

  @belongsTo(() => Institution)
  entityId: string;

  @belongsTo(() => User)
  userId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Visit>) {
    super(data);
  }
}

export interface VisitRelations {
  // describe navigational properties here
}

export type VisitWithRelations = Visit & VisitRelations;
