import React, {createContext, useContext, useEffect, useState} from "react";
import {list} from "../services/user.service";
import {LoginContext} from "./login.context";
import {ROLES} from "../services/auth.service";

export const UsersContext = createContext({});

export const UsersStore = props => {
  const {login} = useContext(LoginContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => await refresh())();
  }, []);

  const refresh = async () => {
    login.role === ROLES.ADMIN && setUsers(await list());
  };

  return (
    <UsersContext.Provider value={{users, setUsers, refresh}}>
      {props.children}
    </UsersContext.Provider>
  );
};
