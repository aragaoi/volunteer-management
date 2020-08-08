import React, {createContext, useState} from "react";

export const LoginContext = createContext(null);

export const LoginStore = props => {
  const [login, setLogin] = useState({
    userId: "5f2e00fabe6e1600047c2d63",
    entityId: undefined,
    isAdmin: true,
  });

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {props.children}
    </LoginContext.Provider>
  );
};
