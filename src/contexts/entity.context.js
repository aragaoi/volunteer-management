import React, {createContext, useEffect, useState} from "react";
import {emptyEntity} from "../services/entity.service";

export const EntityContext = createContext(null);

export const EntityStore = props => {
  const [entity, setEntity] = useState(props.entity);

  useEffect(() => setEntity(props.entity), [props.entity])

  return (
    <EntityContext.Provider value={[entity || emptyEntity(), setEntity]}>
      {props.children}
    </EntityContext.Provider>
  );
};
