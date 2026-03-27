import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auto-login using HttpOnly cookie
  useEffect(() => {
    api
      .get("/api/user/profile")
      .then((res) => {
        console.log("PROFILE RESPONSE:", res.data); // 🔍 DEBUG

        // ✅ STORE FULL USER OBJECT
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🚪 LOGOUT (cookie-based)
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔐 Hook
export const useAuth = () => useContext(AuthContext);