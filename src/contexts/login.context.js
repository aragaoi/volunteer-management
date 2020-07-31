import React, {createContext, useEffect, useState} from "react";

export const LoginContext = createContext(null);

export const LoginStore = props => {
  const [login, setLogin] = useState({
    userId: "5f223e9d42ea623a1828eb56",
    entityId: undefined,
    isAdmin: true,
  });

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {props.children}
    </LoginContext.Provider>
  );
};
