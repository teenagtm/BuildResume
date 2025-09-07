// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // ✅ apna axios file ka path lagao
import { API_PATHS } from "../utils/apiPaths"; 

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("Token");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("Token", userData.token);
    setLoading(false);
  };

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("Token");
    if (!accessToken) {
      setLoading(false);{}
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
