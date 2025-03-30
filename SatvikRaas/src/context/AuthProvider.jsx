import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Load user from localStorage when app starts
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // **🔹 Login Function**
  const login = (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store complete user data

    setUser(userData);
    setIsAuthenticated(true);
  };

  // **🔹 Logout Function**
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// **🔹 Custom Hook for Using Auth Context**
export const useAuth = () => useContext(AuthContext);
