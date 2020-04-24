import React, { useState, useEffect, useContext, createContext, ReactChildren } from "react";
import createAuth0Client, { Auth0ClientOptions } from "@auth0/auth0-spa-js";

interface ContextValueType {
  isAuthenticated?: boolean,
  user?: any,
  loading?: boolean,
  popupOpen?: boolean,
  loginWithPopup?: boolean,
  handleRedirectCallback?: () => void,
  getIdTokenClaims?: (...p: any) => any,
  loginWithRedirect?: (...p: any) => any,
  getTokenSilently?: (...p: any) => any,
  getTokenWithPopup: (...p: any) => any,
  logout?: (...p: any) => any
}

interface IState {
  auth0Client: any,
  isLoading: boolean,
  isAuthenticated: boolean,
  user?: any;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context: any = createContext<ContextValueType | null>(null);
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = (
  {
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
  }: {children: ReactChildren, onRedirectCallback: Function}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
      const initAuth0 = async () => {
        // @ts-ignore
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
    return (
      // @ts-ignore
      <Auth0Context.Provider
        value={{
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
        }}
      >
        {children}
      </Auth0Context.Provider>
    );
};