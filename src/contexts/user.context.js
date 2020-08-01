import React, {createContext, useEffect, useState} from "react";
import {emptyUser} from "../services/user.service";

export const UserContext = createContext(null);

export const UserStore = props => {
  const [user, setUser] = useState(props.user);

  useEffect(() => setUser(props.user), [props.user])

  return (
    <UserContext.Provider value={[user || emptyUser(), setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
