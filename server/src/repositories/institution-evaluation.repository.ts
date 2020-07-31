import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {InstitutionEvaluation, InstitutionEvaluationRelations, Visit, Institution, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VisitRepository} from './visit.repository';
import {InstitutionRepository} from './institution.repository';
import {UserRepository} from './user.repository';

export class InstitutionEvaluationRepository extends DefaultCrudRepository<
  InstitutionEvaluation,
  typeof InstitutionEvaluation.prototype.id,
  InstitutionEvaluationRelations
> {

  public readonly visit: BelongsToAccessor<Visit, typeof InstitutionEvaluation.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof InstitutionEvaluation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('VisitRepository') protected visitRepositoryGetter: Getter<VisitRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(InstitutionEvaluation, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.visit = this.createBelongsToAccessorFor('visit', visitRepositoryGetter,);
    this.registerInclusionResolver('visit', this.visit.inclusionResolver);
  }
}
