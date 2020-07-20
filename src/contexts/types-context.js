import React, {useState, createContext} from "react";
import {typesMock} from "../data";

export const TypesContext = createContext();

export const TypesContextProvider = props => {
  const [types, setTypes] = useState([...typesMock]);

  return (
    <TypesContext.Provider value={[types, setTypes]}>
      {props.children}
    </TypesContext.Provider>
  );
};
