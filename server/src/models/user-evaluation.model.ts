import {model, property} from '@loopback/repository';
import {Evaluation} from '.';

@model({settings: {strict: false}})
export class UserEvaluation extends Evaluation {
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
