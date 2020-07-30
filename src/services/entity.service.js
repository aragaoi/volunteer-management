import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENDPOINT_PATH = "/institutions";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const dayPeriodDefault = () => ({
  "available": false,
  "maxVolunteers": 0
});

const weekDayDefaultValue = () => ({
  "morning": dayPeriodDefault(),
  "afternoon": dayPeriodDefault(),
  "night": dayPeriodDefault(),
});

export const emptyEntity = () => (
  {
    acceptsDonations: true,
    rating: 0,
    address: {},
    evaluations: [],
    calendar: {
      monday: weekDayDefaultValue(),
      tuesday: weekDayDefaultValue(),
      wednesday: weekDayDefaultValue(),
      thursday: weekDayDefaultValue(),
      friday: weekDayDefaultValue(),
      saturday: weekDayDefaultValue(),
      sunday: weekDayDefaultValue(),
    },
  }
);

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function insert(entity) {
  const result = await api.post(ENDPOINT_PATH, entity);
  return result.data;
}

export async function edit(entity) {
  const url = `${ENDPOINT_PATH}/${entity.id}`;

  const result = await api.patch(url, entity);
  return result.data;
}

export async function remove(entity) {
  const result = await api.delete(`${ENDPOINT_PATH}/${entity.id}`);
  return result.data;
}
