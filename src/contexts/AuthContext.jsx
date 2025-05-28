import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API = import.meta.env.VITE_BASE_URL;

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      console.log("Auth Line 22 - User Data received: ",userData)
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        console.log("Auth Line 25 parsedUser: ", parsedUser)
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
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("Login successful");

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

  const isAuthenticated = !!user;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
console.log("User Auth: ", user)
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
