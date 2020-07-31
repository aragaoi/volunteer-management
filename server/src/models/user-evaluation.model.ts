import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Visit} from './visit.model';
import {User} from './user.model';
import {Institution} from './institution.model';

@model({
  settings: {
    strict: false,
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
  @belongsTo(() => Visit)
  visitId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Institution)
  entityId: string;
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
