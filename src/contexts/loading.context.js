import React, {createContext, useState} from "react";

export const LoadingContext = createContext(true);

export const LoadingStore = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {props.children}
    </LoadingContext.Provider>
  );
};
