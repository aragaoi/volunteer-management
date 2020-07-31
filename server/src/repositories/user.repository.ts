import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {User, UserEvaluation, UserRelations} from '../models';
import {DbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {UserEvaluationRepository} from './user-evaluation.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly evaluations: HasManyRepositoryFactory<UserEvaluation, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserEvaluationRepository') protected userEvaluationRepositoryGetter: Getter<UserEvaluationRepository>
  ) {
    super(User, dataSource);
    this.evaluations = this.createHasManyRepositoryFactoryFor('evaluations', userEvaluationRepositoryGetter,);
    this.registerInclusionResolver('evaluations', this.evaluations.inclusionResolver);
  }
}
