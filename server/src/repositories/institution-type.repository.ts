import {DefaultCrudRepository} from '@loopback/repository';
import {InstitutionType, InstitutionTypeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InstitutionTypeRepository extends DefaultCrudRepository<
  InstitutionType,
  typeof InstitutionType.prototype.id,
  InstitutionTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(InstitutionType, dataSource);
  }
}
