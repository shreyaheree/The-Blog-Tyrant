import { createContext, useState, useEffect } from "react";
import loginService from "../services/login-service";
import registerService from "../services/register-service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [postsType, setPostsType] = useState("latest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
      const cookie = JSON.parse(storedUser);
      if (cookie.role === "admin") {
        setIsAdmin(true);
      }
      if (cookie.role === "mod") {
        setIsModerator(true);
      }
    }
  }, []);

  const login = async (role, userName, password) => {
    const response = await loginService(role, userName, password);
    if (response.data) {
      setUser(response.data);
      setIsAuth(true);
      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
      if (response.data.role === "mod") {
        setIsModerator(true);
      }
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
    setIsModerator(false);
    localStorage.removeItem("user");
  };

  const register = async (userName, password) => {
    const response = await registerService(userName, password);
    if (response.data) {
      setUser(response.data);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        login,
        logout,
        setUser,
        register,
        isAdmin,
        isModerator,
        postsType,
        setPostsType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
