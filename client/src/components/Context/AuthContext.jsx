import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headers, setHeaders] = useState(null);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  useEffect(() => {
    // Check if the token is present in cookies
    const token = cookies["token"];
    const admin = cookies["isAdmin"];
    if (token) {
      // Token exists, user is logged in
      setIsLoggedIn(true);
      setHeaders({ authorization: token });
      setIsAdmin(admin);
    } else {
      // Token does not exist, user is not logged in
      setIsLoggedIn(false);
    }
  }, [cookies]);

  const login = (token) => {
    setCookie("token", token, { path: "/" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    setIsLoggedIn(false);
  };

  const onLogin = (role, token) => {
    setCookie("token", token, { path: "/" });
    setIsAdmin(role);
    setCookie("isAdmin", role);
  };

  const authContextValue = {
    isLoggedIn,
    headers,
    isAdmin,
    resetPasswordEmail,
    setResetPasswordEmail,
    onLogin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
