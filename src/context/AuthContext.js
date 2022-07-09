import React, { useState, createContext, useEffect } from "react";
import { getToken, setToken, deleteToken } from "../api/token";
import { useUser } from "../hooks";

/* The AuthContext is a React Context that holds the authentication state of the user.
 */
export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});

/**
 * The AuthProvider component is a React context provider that wraps around the entire application.
 * It's responsible for setting the auth state and providing methods to login and logout.
 * It also passes the auth state and methods to all child components
 * @returns The AuthProvider is returning a context provider that will wrap the children.
 */
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const token = getToken();

      if (token) {
        const userData = await getMe(token);
        setAuth({ token, userData });
      } else {
        setAuth(null);
      }
    })();
    setLoading(false);
  }, []);

  const login = async (token) => {
    setToken(token);
    const userData = await getMe(token);
    setAuth({ token, userData });
  };

  const logout = () => {
    if (auth) {
      deleteToken();
      setAuth(null);
    }
  };

  
  const valueContext = {
    auth,
    login,
    logout,
  };

  if (loading) return null;
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}