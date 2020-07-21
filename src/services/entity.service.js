import {entitiesMock} from "../data";

const dayPeriodDefault = {
  "available": false,
  "maxVolunteers": 0
};

const weekDayDefaultValue = {
  "morning": dayPeriodDefault,
  "afternoon": dayPeriodDefault,
  "night": dayPeriodDefault
};

export const emptyEntity = () => (
  {
    address: {},
    calendar: {
      monday: weekDayDefaultValue,
      tuesday: weekDayDefaultValue,
      wednesday: weekDayDefaultValue,
      thursday: weekDayDefaultValue,
      friday: weekDayDefaultValue,
      saturday: weekDayDefaultValue,
      sunday: weekDayDefaultValue,
    },
    rating: {}
  }
);

export function list() {
  return [...entitiesMock];
}
