import Axios from "axios";
import * as _ from "lodash";

const ENDPOINT_PATH = "/institutions";



const dayPeriodDefault = () => ({
  available: false,
  maxVolunteers: undefined
});

const weekDayDefaultValue = () => ({
  morning: dayPeriodDefault(),
  afternoon: dayPeriodDefault(),
  night: dayPeriodDefault(),
});

export const emptyEntity = () => (
  {
    acceptsDonations: true,
    rating: undefined,
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
  }
);

export async function list(filter) {
  const address = _.isEmpty(filter?.address) ? undefined : filter.address;
  const params = {...filter, address};
  const result = await Axios.get(ENDPOINT_PATH, {params});
  return result.data;
}

export async function get(id) {
  const result = await Axios.get(`${ENDPOINT_PATH}/${id}`);
  return result.data;
}

export async function insert(entity) {
  const result = await Axios.post(ENDPOINT_PATH, entity);
  return result.data;
}

export async function edit(entity) {
  const url = `${ENDPOINT_PATH}/${entity.id}`;

  const result = await Axios.patch(url, entity);
  return result.data;
}

export async function remove(entity) {
  const result = await Axios.delete(`${ENDPOINT_PATH}/${entity.id}`);
  return result.data;
}
