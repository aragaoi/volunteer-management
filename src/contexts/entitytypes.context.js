import React, {createContext, useEffect, useReducer} from "react";
import {list} from "../services/entitytype.service";
import * as _ from "lodash";

export const EntityTypesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      action.payload.added = true;
      action.payload.active = true;
      return [...state, action.payload];
    case 'DELETE':
      if(!action.payload.added) {
        action.payload.deleted = true;
      }

      _.remove(state, {id: action.payload.id});
      action.payload.active = false;
      return [...state, action.payload];
    case 'INIT':
      return [...action.payload];
    default:
      throw new Error();
  }
}

export const EntityTypesStore = props => {
  const [entityTypes, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    (async () => dispatch({type: "INIT", payload: await list()}))();
  }, []);

  return (
    <EntityTypesContext.Provider value={[entityTypes, dispatch]}>
      {props.children}
    </EntityTypesContext.Provider>
  );
};
