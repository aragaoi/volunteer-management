import React, {createContext, useState} from "react";
import {list} from "../services/states.service";

export const StatesContext = createContext();

export const StatesStore = props => {
  const [states, setStates] = useState(list());

  return (
    <StatesContext.Provider value={[states, setStates]}>
      {props.children}
    </StatesContext.Provider>
  );
};
