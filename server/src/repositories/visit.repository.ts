import {DefaultCrudRepository} from '@loopback/repository';
import {Visit, VisitRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VisitRepository extends DefaultCrudRepository<
  Visit,
  typeof Visit.prototype.id,
  VisitRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Visit, dataSource);
  }
}
