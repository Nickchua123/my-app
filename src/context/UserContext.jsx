import { createContext, useContext, useState, useEffect } from "react";
import api from "../Config/axiosConfig"; // Đã có interceptor tự refresh token

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khi app load lại: lấy token và user từ localStorage, sau đó xác thực lại từ BE
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("currentUser");

    if (token && savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);

      // Lấy lại dữ liệu user từ backend (nếu token hết hạn sẽ được interceptor xử lý)
      api
        .get("/users/me")
        .then((response) => {
          setCurrentUser(response.data.data);
          localStorage.setItem("currentUser", JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          // Nếu lỗi 401 do hết hạn refresh sẽ tự logout bởi interceptor, còn các lỗi khác chỉ log
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Đăng nhập
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        username: email,
        password,
      });
      const { accessToken, refreshToken, user } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Đăng ký
  const register = async (data) => {
    try {
      await api.post("/createUser", data);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
