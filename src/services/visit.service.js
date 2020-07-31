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
  const url = `${ENDPOINT_PATH}/${visit.id}`;

  const result = await api.patch(url, {status: VISIT_STATUS.CANCELED});
  return result.data;
}

export async function confirm(visit) {
  const url = `${ENDPOINT_PATH}/${visit.id}`;

  const result = await api.patch(url, {status: VISIT_STATUS.CONFIRMED});
  return result.data;
}
