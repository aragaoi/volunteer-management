import React, {createContext, useState} from "react";
import {statesMock} from "../data";

export const StatesContext = createContext();

export const StatesStore = props => {
  const [states, setStates] = useState(statesMock);

  return (
    <StatesContext.Provider value={[states, setStates]}>
      {props.children}
    </StatesContext.Provider>
  );
};
