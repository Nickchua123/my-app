import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../Config/axiosConfig"

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/login",
        {
          username: email,
          password,
          rememberMe, // ✅ gửi cùng API
        },
        { withCredentials: true } // để nhận refreshToken từ cookie
      );

      // ✅ Lưu accessToken + thông tin người dùng
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("currentAdmin", res.data.user.email); // hoặc res.data.user.id

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
      alert("❌ Tài khoản hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">🔐 Đăng nhập Admin</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Ghi nhớ đăng nhập
        </label>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
