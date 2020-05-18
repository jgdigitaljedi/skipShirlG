import React, { ReactNode } from 'react';
import {
  GlobalContext,
  GlobalContextProvider,
  IGlobalContextProps,
  IGlobalContext
} from './globalContext';
import { UserContext, UserContextProvider, IUserContextProps, IUserContext } from './userContext';

interface ICombined {
  global: IGlobalContext;
  user: IUserContext;
}
interface IProps extends ICombined {
  children: ReactNode;
}

const CombinedContextProvider = ({ global, user, children }: IProps) => (
  <GlobalContextProvider>
    <UserContextProvider>{children}</UserContextProvider>
  </GlobalContextProvider>
);

const CombinedContextConsumer = ({
  global,
  user,
  children
}: {
  global: IGlobalContextProps;
  user: IUserContextProps;
  children: any;
}) => (
  <GlobalContext.Consumer>
    {(global) => <UserContext.Consumer>{(user) => children(global, user)}</UserContext.Consumer>}
  </GlobalContext.Consumer>
);

export { CombinedContextProvider, CombinedContextConsumer };
