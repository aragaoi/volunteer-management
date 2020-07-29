import {DefaultCrudRepository} from '@loopback/repository';
import {Institution, InstitutionRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InstitutionRepository extends DefaultCrudRepository<
  Institution,
  typeof Institution.prototype.id,
  InstitutionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Institution, dataSource);
  }
}
