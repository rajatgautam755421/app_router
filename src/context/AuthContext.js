"use client";

import { setUserCookie } from "@/helpers/general";
import Cookies from "universal-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (response) => {
    setUser({ ...response });
  };

  const logout = () => {
    setUser(null);
    setUserCookie(null);
  };

  useEffect(() => {
    const cookies = new Cookies();
    const userCookieValue = cookies.get("user");

    if (userCookieValue) {
      setUser(userCookieValue);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
