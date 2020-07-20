import React, {useState, createContext} from "react";

export const EntityContext = createContext();

const dayPeriodDefault = {
  "available": false,
  "maxVolunteers": 0
};
const weekDayDefaultValue = {
  "morning": dayPeriodDefault,
  "afternoon": dayPeriodDefault,
  "night": dayPeriodDefault
};
export const EntityContextProvider = props => {
  const [entity, setEntity] = useState({
    ...{
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
    },
    ...props.entity
  });

  return (
    <EntityContext.Provider value={[entity, setEntity]}>
      {props.children}
    </EntityContext.Provider>
  );
};
