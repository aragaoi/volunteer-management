import React, {createContext, Dispatch, useEffect, useState} from "react";

const defaultValue = {
  searchTerm: "",
  searchAttributes: {}
};

export const FilterContext = createContext(defaultValue);

export const FilterStore = (props) => {
  const [filter, setFilter] = useState(defaultValue);

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {props.children}
    </FilterContext.Provider>
  );
};
