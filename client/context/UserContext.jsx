// UserContextProvider.js
import axios from "../src/axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          const response = await axios.get("/api/auth");
          const data = response.data;
          if (data && data.user) {
            setUser(data.user);
            setToken(data.token);
          } else {
            console.log(data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, token]);

  // fetch user data after logging in
  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.token);
  };

  const logout = () => {
    axios.get("/api/auth/logout").then(({ data }) => {
      setUser(null);
      setToken(null);
      if (data.message) {
        toast.success(data.message);
      }
    });
  };

  const updateUserProfile = (newProfile) => {
    setUser((user) => ({
      ...user,
      profile: newProfile,
    }));
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, updateUserProfile, loading, token }}
    >
      {children}
    </UserContext.Provider>
  );
}
