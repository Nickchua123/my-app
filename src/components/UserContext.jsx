// UserContext.jsx – Quản lý đăng nhập người dùng (không phải admin)
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === userData.email)) return false;

    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    const updated = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updated));
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
