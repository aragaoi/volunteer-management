import React, {createContext, useEffect, useState} from "react";
import {list} from "../services/visit.service";

export const VisitsContext = createContext([]);

export const VisitsStore = props => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    (async () => setVisits(await list()))();
  }, []);

  return (
    <VisitsContext.Provider value={[visits, setVisits]}>
      {props.children}
    </VisitsContext.Provider>
  );
};
