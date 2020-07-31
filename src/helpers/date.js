import moment from "moment";
import * as _ from "lodash";
import {getPeriods} from "../services/visit.service";

const periods = getPeriods();

export function formatDateAndPeriod(date, periodKey) {
  const formattedDate = date ? moment(date).format("DD/MM/YY") : "";
  const period = _.find(periods, {key: periodKey})
  return `${formattedDate} (${period.label})`;
}
