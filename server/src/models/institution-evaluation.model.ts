import {model, property} from '@loopback/repository';
import {Evaluation} from '.';

@model({settings: {strict: false}})
export class InstitutionEvaluation extends Evaluation {
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
