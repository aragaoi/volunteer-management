import React, {useState, createContext} from "react";
import {statesMock} from "../data";

export const StatesContext = createContext();

export const StatesContextProvider = props => {
  const [states, setStates] = useState(statesMock);

  return (
    <StatesContext.Provider value={[states, setStates]}>
      {props.children}
    </StatesContext.Provider>
  );
};
