import {DefaultCrudRepository} from '@loopback/repository';
import {InstitutionEvaluation, InstitutionEvaluationRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InstitutionEvaluationRepository extends DefaultCrudRepository<
  InstitutionEvaluation,
  typeof InstitutionEvaluation.prototype.id,
  InstitutionEvaluationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(InstitutionEvaluation, dataSource);
  }
}
