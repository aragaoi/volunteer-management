import React, {createContext, useState} from "react";

export const UserContext = createContext(null);

export const UserStore = props => {
  const [user, setUser] = useState(props.user);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
