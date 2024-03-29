"use client";

import { createContext, useContext, useReducer, useState } from "react";

const ContextState = createContext<number>(0);
const ContextDispatch = createContext<
  React.Dispatch<React.SetStateAction<number>>
>(() => {});

//!to the app component
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <ContextState.Provider value={count}>
      <ContextDispatch.Provider value={setCount}>
        {children}
      </ContextDispatch.Provider>
    </ContextState.Provider>
  );
};
//!to access the state
const useContextState = () => useContext(ContextState);

//!to access the dispatch method
const useContextDispatch = () => useContext(ContextDispatch);
export { ContextProvider, useContextState, useContextDispatch };
