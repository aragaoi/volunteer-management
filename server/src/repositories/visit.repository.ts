import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Visit, VisitRelations, Institution, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InstitutionRepository} from './institution.repository';
import {UserRepository} from './user.repository';

export class VisitRepository extends DefaultCrudRepository<
  Visit,
  typeof Visit.prototype.id,
  VisitRelations
> {

  public readonly entity: BelongsToAccessor<Institution, typeof Visit.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Visit.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InstitutionRepository') protected institutionRepositoryGetter: Getter<InstitutionRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Visit, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.entity = this.createBelongsToAccessorFor('entity', institutionRepositoryGetter,);
    this.registerInclusionResolver('entity', this.entity.inclusionResolver);
  }
}

