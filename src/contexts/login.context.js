import React, {createContext, useContext, useEffect, useState} from "react";
import {doLogin, doLoginWithToken, doLogout} from "../services/auth.service";
import {LoadingContext} from "./loading.context";

export const LoginContext = createContext(null);

export const LoginStore = props => {
  const {setIsLoading} = useContext(LoadingContext);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const signInWithToken = async () => {
      setIsLoading(true);
      try {
        await refresh();
      } finally {
        setIsLoading(false);
      }
    };
    signInWithToken();
  }, []);

  const signIn = async (credentials) => {
    const authData = await doLogin(credentials);
    setLogin(authData);
  }

  const signOut = () => {
    doLogout();
    setLogin(null);
  }

  const refresh = async () => {
    setLogin(await doLoginWithToken());
  }

  return (
    <LoginContext.Provider value={{login, setLogin, signIn, signOut, refresh}}>
      {props.children}
    </LoginContext.Provider>
  );
};
