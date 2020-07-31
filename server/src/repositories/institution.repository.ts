import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Institution, InstitutionEvaluation, InstitutionRelations, InstitutionType} from '../models';
import {DbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {InstitutionTypeRepository} from './institution-type.repository';
import {InstitutionEvaluationRepository} from './institution-evaluation.repository';

export class InstitutionRepository extends DefaultCrudRepository<
  Institution,
  typeof Institution.prototype.id,
  InstitutionRelations
> {

  public readonly institutionType: BelongsToAccessor<InstitutionType, typeof Institution.prototype.id>;

  public readonly evaluations: HasManyRepositoryFactory<InstitutionEvaluation, typeof Institution.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('InstitutionTypeRepository') protected institutionTypeRepositoryGetter: Getter<InstitutionTypeRepository>,
    @repository.getter('InstitutionEvaluationRepository') protected institutionEvaluationRepositoryGetter: Getter<InstitutionEvaluationRepository>,
  ) {
    super(Institution, dataSource);
    this.evaluations = this.createHasManyRepositoryFactoryFor('evaluations', institutionEvaluationRepositoryGetter,);
    this.registerInclusionResolver('evaluations', this.evaluations.inclusionResolver);

    this.institutionType = this.createBelongsToAccessorFor('institutionType', institutionTypeRepositoryGetter,);
    this.registerInclusionResolver('institutionType', this.institutionType.inclusionResolver);
  }
}
