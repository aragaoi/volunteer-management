import React, {createContext, useState} from "react";

export const LoginContext = createContext(null);

export const LoginStore = props => {
  const [login, setLogin] = useState({
    userId: process.env.NODE_ENV === "production" ? "5f2e00fabe6e1600047c2d63" : "5f223e9d42ea623a1828eb56",
    entityId: undefined,
    isAdmin: true,
  });

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {props.children}
    </LoginContext.Provider>
  );
};
