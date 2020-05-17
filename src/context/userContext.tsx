import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface IUserContext {
  token: string;
  hasCookie: boolean;
  name: string;
}

interface IUserContextProps extends IUserContext {
  children: ReactNode;
}

const defaultUserState = { token: '', hasCookie: false, name: '' };
const UserContext = createContext<[IUserContext, Dispatch<SetStateAction<IUserContext>>]>([
  defaultUserState,
  () => defaultUserState
]);

const UserContextProvider = (props: IUserContextProps) => {
  const [uc, setUc] = useState<IUserContext>(defaultUserState);
  return <UserContext.Provider value={[uc, setUc]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
