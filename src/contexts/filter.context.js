import React, {createContext, Dispatch, useEffect, useState} from "react";

const defaultValue = {
  searchTerm: "",
  searchAttributes: {}
};

export const FilterContext = createContext(defaultValue);

export const FilterStore = (props) => {
  const [localFilter, setLocalFilter] = useState({...defaultValue});
  const [remoteFilter, setRemoteFilter] = useState({...defaultValue});

  return (
    <FilterContext.Provider value={{localFilter, remoteFilter, setLocalFilter, setRemoteFilter}}>
      {props.children}
    </FilterContext.Provider>
  );
};
