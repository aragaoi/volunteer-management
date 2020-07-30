import React, {createContext, useEffect, useState} from "react";

export const EntityContext = createContext(null);

export const EntityStore = props => {
  const [entity, setEntity] = useState(props.entity);

  useEffect(() => setEntity(props.entity), [props.entity])

  return (
    <EntityContext.Provider value={[entity, setEntity]}>
      {props.children}
    </EntityContext.Provider>
  );
};
