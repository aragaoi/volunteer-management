import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENDPOINT_PATH = "/visits";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const VISIT_STATUS = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  EVALUATION: "EVALUATION",
  DONE: "DONE",
};

export const emptyVisit = () => (
  {
    status: VISIT_STATUS.SCHEDULED,
  }
);

export const getWeekDays = () => [
  {label: 'Segunda-feira', key: 'monday'},
  {label: 'Terça-feira', key: 'tuesday'},
  {label: 'Quarta-feira', key: 'wednesday'},
  {label: 'Quinta-feira', key: 'thursday'},
  {label: 'Sexta-feira', key: 'friday'},
  {label: 'Sábado', key: 'saturday'},
  {label: 'Domingo', key: 'sunday'},
];

export const getPeriods = () => [
  {label: "Manhã", key: "morning"},
  {label: "Tarde", key: "afternoon"},
  {label: "Noite", key: "night"},
];

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function insert(visit) {
  const result = await api.post(ENDPOINT_PATH, visit);
  return result.data;
}

export async function cancel(visit) {
  return await update(visit, {status: VISIT_STATUS.CANCELED});
}

export async function confirm(visit) {
  return await update(visit, {status: VISIT_STATUS.CONFIRMED});
}

export async function finishByUser(visit) {
  const patch = {
    evaluatedByUser: true,
    status: VISIT_STATUS.EVALUATION
  }
  return await update(visit, patch);
}

export async function finishByEntity(visit) {
  const patch = {
    evaluatedByEntity: true,
    status: VISIT_STATUS.EVALUATION
  }
  return await update(visit, patch);
}

async function update(visit, patch) {
  const url = `${ENDPOINT_PATH}/${visit.id}`;

  const result = await api.patch(url, patch);
  return result.data;
}
