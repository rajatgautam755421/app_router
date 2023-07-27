"use client";

import { getCookieValueInClient, setUserCookie } from "@/helpers/general";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    setUser({ token });
    setUserCookie("sdjkfhjhsdgfhjsdgh");
  };

  const logout = () => {
    setUser(null);
    setUserCookie(null);
  };

  useEffect(() => {
    const storedUser = getCookieValueInClient("user");

    if (storedUser) {
      setUser({ token: storedUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
