import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    hiddenProperties: ['userId'],
    scope: {
      order: "date DESC"
    },
  }
})
export class UserEvaluation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: "date",
    dataType: "timestamp",
    defaultFn: "now"
  })
  date?: Date;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  entityId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserEvaluation>) {
    super(data);
  }
}

export interface UserEvaluationRelations {
  // describe navigational properties here
}

export type UserEvaluationWithRelations = UserEvaluation & UserEvaluationRelations;
