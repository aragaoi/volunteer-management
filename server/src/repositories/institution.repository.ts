import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Institution, InstitutionRelations, InstitutionType} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InstitutionTypeRepository} from './institution-type.repository';

export class InstitutionRepository extends DefaultCrudRepository<
  Institution,
  typeof Institution.prototype.id,
  InstitutionRelations
> {

  public readonly institutionType: BelongsToAccessor<InstitutionType, typeof Institution.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InstitutionTypeRepository') protected institutionTypeRepositoryGetter: Getter<InstitutionTypeRepository>,
  ) {
    super(Institution, dataSource);
    this.institutionType = this.createBelongsToAccessorFor('institutionType', institutionTypeRepositoryGetter,);
    this.registerInclusionResolver('institutionType', this.institutionType.inclusionResolver);
  }
}
