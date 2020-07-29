import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Evaluation extends Entity {
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
    type: 'string',
  })
  comment?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Evaluation>) {
    super(data);
  }
}

export interface EntityEvaluationRelations {
  // describe navigational properties here
}

export type EntityEvaluationWithRelations = Evaluation & EntityEvaluationRelations;
