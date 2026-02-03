import { createContext, useEffect, useState } from "react";
import { parseJwt } from "./jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  // 🔑 Load auth from localStorage safely
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = parseJwt(token);
      setAuth({ token, user });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({
      token,
      user: parseJwt(token),
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
