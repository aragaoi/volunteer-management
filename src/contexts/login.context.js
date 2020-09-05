import React, {createContext, useState} from "react";
import {doLogin, doLogout} from "../services/auth.service";

export const LoginContext = createContext(null);

export const LoginStore = props => {
  const [login, setLogin] = useState({
    userId: process.env.NODE_ENV === "production" ? "5f2e00fabe6e1600047c2d63" : "5f223e9d42ea623a1828eb56",
    entityId: undefined,
    isAdmin: true,
  });

  const signIn = async (credentials) => {
    const authData = await doLogin(credentials);
    setLogin(authData);
  }

  const signOut = () => {
    doLogout();
    setLogin(null);
  }

  return (
    <LoginContext.Provider value={{login, setLogin, signIn, signOut}}>
      {props.children}
    </LoginContext.Provider>
  );
};
