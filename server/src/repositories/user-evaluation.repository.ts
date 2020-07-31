import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UserEvaluation, UserEvaluationRelations, Visit, User, Institution} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VisitRepository} from './visit.repository';
import {UserRepository} from './user.repository';
import {InstitutionRepository} from './institution.repository';

export class UserEvaluationRepository extends DefaultCrudRepository<
  UserEvaluation,
  typeof UserEvaluation.prototype.id,
  UserEvaluationRelations
> {

  public readonly visit: BelongsToAccessor<Visit, typeof UserEvaluation.prototype.id>;

  public readonly entity: BelongsToAccessor<Institution, typeof UserEvaluation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('VisitRepository') protected visitRepositoryGetter: Getter<VisitRepository>, @repository.getter('InstitutionRepository') protected institutionRepositoryGetter: Getter<InstitutionRepository>,
  ) {
    super(UserEvaluation, dataSource);
    this.entity = this.createBelongsToAccessorFor('entity', institutionRepositoryGetter,);
    this.registerInclusionResolver('entity', this.entity.inclusionResolver);
    this.visit = this.createBelongsToAccessorFor('visit', visitRepositoryGetter,);
    this.registerInclusionResolver('visit', this.visit.inclusionResolver);
  }
}
