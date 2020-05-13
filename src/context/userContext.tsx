import React, { createContext, useState } from 'react';

const defaultUserState = {};
const UserContext = createContext([defaultUserState, () => defaultUserState]);

const UserContextProvider = (props: any) => {
  const [uc, setUc] = useState(defaultUserState);
  return <UserContext.Provider value={[uc, setUc]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
