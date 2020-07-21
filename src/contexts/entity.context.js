import React, {createContext, useState} from "react";

export const EntityContext = createContext(null);

export const EntityStore = props => {
  const [entity, setEntity] = useState(props.entity);

  return (
    <EntityContext.Provider value={[entity, setEntity]}>
      {props.children}
    </EntityContext.Provider>
  );
};
