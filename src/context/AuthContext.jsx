// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(stored);

    // ✅ Nếu chưa có danh sách admin → thêm mặc định
    const adminList = localStorage.getItem("admins");
    if (!adminList) {
      const defaultAdmins = [{ email: "admin@gmail.com", password: "admin123" }];
      localStorage.setItem("admins", JSON.stringify(defaultAdmins));
    }
  }, []);

  const login = (emailInput, passwordInput) => {
    const email = emailInput.trim();
    const password = passwordInput.trim();

    const stored = localStorage.getItem("admins");
    const admins = stored ? JSON.parse(stored) : [];

    const found = admins.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (found) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("currentAdmin", email);
      setIsAdmin(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("currentAdmin");
    localStorage.removeItem("role");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
