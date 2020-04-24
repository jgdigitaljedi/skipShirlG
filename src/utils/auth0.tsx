import React, { useState, useEffect, useContext, createContext, ReactChildren, Context } from "react";
import createAuth0Client, { Auth0ClientOptions, Auth0Client } from "@auth0/auth0-spa-js";

interface IContextValueType {
  isAuthenticated?: boolean,
  user?: any,
  loading?: boolean,
  popupOpen?: boolean,
  loginWithPopup?: Function,
  handleRedirectCallback?: () => void,
  getIdTokenClaims?: (...p: any) => any,
  loginWithRedirect?: (...p: any) => any,
  getTokenSilently?: (...p: any) => any,
  getTokenWithPopup: (...p: any) => any,
  logout?: (...p: any) => any
}

interface IAuthContext extends Auth0ClientOptions, IContextValueType {}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context: Context<IAuthContext> = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: (...p) => {},
  loginWithRedirect: (...p) => {},
  getTokenSilently: (...p) => {},
  getTokenWithPopup: (...p) => {},
  logout: (...p) => {},
  domain: '',
  client_id: '',
  redirect_uri: ''
});

export const useAuth0: any = () => useContext(Auth0Context);

export const Auth0Provider = (
  {
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
  }: {children: ReactChildren, onRedirectCallback: Function, domain: string, client_id: string, redirect_uri: string}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState<Auth0Client>();
    const [loading, setLoading] = useState<boolean>(true);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

    useEffect(() => {
      const initAuth0 = async () => {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0(auth0FromHook);

        if (window.location.search.includes("code=") &&
            window.location.search.includes("state=")) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);
        }

        setLoading(false);
      };
      initAuth0();
      // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
      setPopupOpen(true);
      try {
        // @ts-ignore
        await auth0Client.loginWithPopup(params);
      } catch (error) {
        console.error(error);
      } finally {
        setPopupOpen(false);
      }
      // @ts-ignore
      const user = await auth0Client.getUser();
      setUser(user);
      // @ts-ignore
      setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
      setLoading(true);
      // @ts-ignore
      await auth0Client.handleRedirectCallback();
      // @ts-ignore
      const user = await auth0Client.getUser();
      setLoading(false);
      setIsAuthenticated(true);
      setUser(user);
    };

    const providerConfig: IContextValueType = {
      isAuthenticated,
      user,
      loading,
      popupOpen,
      loginWithPopup,
      handleRedirectCallback,
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
      logout: (...p) => auth0Client.logout(...p)
    };

    return (
      <Auth0Context.Provider value={providerConfig}>
        {children}
      </Auth0Context.Provider>
    );
};