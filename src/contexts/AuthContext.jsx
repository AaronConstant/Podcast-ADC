import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = import.meta.env.VITE_BASE_URL;
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      console.log("Line-20 userData in AuthContext: ", userData)
      const parsedUser = JSON.parse(userData)
      if (token && userData) {
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API}/login`, credentials);

      if (response.status === 200) {

        const { token, user, message } = response.data;
        localStorage.setItem("token", token);

        const stringifiedUser = JSON.stringify(user)
        localStorage.setItem("user", stringifiedUser)
        console.log(localStorage)
        setUser(user);
        setIsAuthenticated(true);
        console.log(message);

        return { success: true, user };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to sign in. Please try again.",
      };
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setIsAuthenticated(false);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
