import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Institution, InstitutionRelations, Address} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';

export class InstitutionRepository extends DefaultCrudRepository<
  Institution,
  typeof Institution.prototype.id,
  InstitutionRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Institution.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Institution, dataSource);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
