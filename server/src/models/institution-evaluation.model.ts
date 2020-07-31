import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    hiddenProperties: ['entityId'],
    scope: {
      order: "date DESC"
    },
  }
})
export class InstitutionEvaluation extends Entity {
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
  entityId?: string;

  @property({
    type: 'string',
  })
  userId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InstitutionEvaluation>) {
    super(data);
  }
}

export interface InstitutionEvaluationRelations {
  // describe navigational properties here
}

export type InstitutionEvaluationWithRelations = InstitutionEvaluation & InstitutionEvaluationRelations;
