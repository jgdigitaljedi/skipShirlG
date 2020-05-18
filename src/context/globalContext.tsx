import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  authDialogOpen: boolean;
}

export interface IGlobalContextProps extends IGlobalContext {
  children: any;
}

const defaultGlobalState = { authDialogOpen: false };
const GlobalContext = createContext<[IGlobalContext, Dispatch<SetStateAction<IGlobalContext>>]>([
  defaultGlobalState,
  () => defaultGlobalState
]);

const GlobalContextProvider = (props: any) => {
  const [uc, setUc] = useState<IGlobalContext>(defaultGlobalState);
  return <GlobalContext.Provider value={[uc, setUc]}>{props.children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalContextProvider };
