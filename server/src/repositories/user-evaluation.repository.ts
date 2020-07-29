import {DefaultCrudRepository} from '@loopback/repository';
import {UserEvaluation, UserEvaluationRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserEvaluationRepository extends DefaultCrudRepository<
  UserEvaluation,
  typeof UserEvaluation.prototype.id,
  UserEvaluationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserEvaluation, dataSource);
  }
}
