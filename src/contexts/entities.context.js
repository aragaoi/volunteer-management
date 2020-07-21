import React, {createContext, useEffect, useState} from "react";
import {entitiesMock} from "../data";

export const EntitiesContext = createContext([]);

export const EntitiesStore = props => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    setEntities(props.entities || entitiesMock);
  }, []);

  return (
    <EntitiesContext.Provider value={[entities, setEntities]}>
      {props.children}
    </EntitiesContext.Provider>
  );
};
