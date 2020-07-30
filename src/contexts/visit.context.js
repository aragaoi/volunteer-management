import React, {createContext, useEffect, useState} from "react";

export const VisitContext = createContext(null);

export const VisitStore = props => {
  const [visit, setVisit] = useState(props.visit);

  useEffect(() => setVisit(props.visit), [props.visit])

  return (
    <VisitContext.Provider value={[visit, setVisit]}>
      {props.children}
    </VisitContext.Provider>
  );
};
