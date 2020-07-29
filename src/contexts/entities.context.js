import React, {createContext, useEffect, useState} from "react";
import {list} from "../services/entity.service";

export const EntitiesContext = createContext([]);

export const EntitiesStore = props => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    (async () => setEntities(await list()))();
  }, []);

  return (
    <EntitiesContext.Provider value={[entities, setEntities]}>
      {props.children}
    </EntitiesContext.Provider>
  );
};
