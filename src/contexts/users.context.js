import React, {createContext, useEffect, useState} from "react";
import {list} from "../services/user.service";

export const UsersContext = createContext([]);

export const UsersStore = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => setUsers(await list()))();
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
