import {entitiesMock} from "../data";
import * as axios from "axios";

const BASE_URL = "http://localhost:3000";
const ENDPOINT_PATH = "/institutions";

const api = axios.create({
  baseURL: BASE_URL,
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
    address: {},
    calendar: {
      monday: weekDayDefaultValue(),
      tuesday: weekDayDefaultValue(),
      wednesday: weekDayDefaultValue(),
      thursday: weekDayDefaultValue(),
      friday: weekDayDefaultValue(),
      saturday: weekDayDefaultValue(),
      sunday: weekDayDefaultValue(),
    },
    rating: {}
  }
);

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function save(entity) {
  console.log(`Salvando ${JSON.stringify(entity, null, 2)}`);
  const result = await api.post(ENDPOINT_PATH, entity);
  return result.data;
}
