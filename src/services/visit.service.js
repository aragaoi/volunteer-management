import Axios from "axios";

const ENDPOINT_PATH = "/visits";

export const VISIT_STATUSES = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
  EVALUATION: "EVALUATION",
  DONE: "DONE",
};

export const emptyVisit = () => (
  {
    status: VISIT_STATUSES.SCHEDULED,
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
  const result = await Axios.get(ENDPOINT_PATH);
  return result.data;
}

export async function insert(visit) {
  const result = await Axios.post(ENDPOINT_PATH, visit);
  return result.data;
}

export async function cancel(visit) {
  return await update(visit, {status: VISIT_STATUSES.CANCELED});
}

export async function reject(visit) {
  return await update(visit, {status: VISIT_STATUSES.REJECTED});
}

export async function confirm(visit) {
  return await update(visit, {status: VISIT_STATUSES.CONFIRMED});
}

export async function finishByUser(visit) {
  const patch = {
    evaluatedByUser: true,
    status: VISIT_STATUSES.EVALUATION
  }
  return await update(visit, patch);
}

export async function finishByEntity(visit) {
  const patch = {
    evaluatedByEntity: true,
    status: VISIT_STATUSES.EVALUATION
  }
  return await update(visit, patch);
}

async function update(visit, patch) {
  const url = `${ENDPOINT_PATH}/${visit.id}`;

  const result = await Axios.patch(url, patch);
  return result.data;
}
