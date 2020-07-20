import React, {useState, createContext} from "react";

export const EntityContext = createContext();

export const EntityContextProvider = props => {
  const [entity, setEntity] = useState({...props.entity});

  return (
    <EntityContext.Provider value={[entity, setEntity]}>
      {props.children}
    </EntityContext.Provider>
  );
};
