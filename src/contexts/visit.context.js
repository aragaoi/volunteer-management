import React, {createContext, useEffect, useState} from "react";
import {emptyVisit} from "../services/visit.service";

export const VisitContext = createContext(null);

export const VisitStore = props => {
  const [visit, setVisit] = useState(props.visit);

  useEffect(() => setVisit(props.visit), [props.visit])

  return (
    <VisitContext.Provider value={[visit || emptyVisit(), setVisit]}>
      {props.children}
    </VisitContext.Provider>
  );
};
