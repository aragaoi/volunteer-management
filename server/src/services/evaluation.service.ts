import {bind, BindingScope} from '@loopback/core';
import {InstitutionEvaluation, UserEvaluation} from "../models";
import * as _ from "lodash";

@bind({scope: BindingScope.TRANSIENT})
export class EvaluationService {
  constructor() {
  }

  public calculateAverageRating (evaluations: InstitutionEvaluation[] | UserEvaluation[]): number | undefined {
    return _.isEmpty(evaluations) ? undefined : Math.round(_.meanBy(evaluations, "rating"));
  }
}
