// UserLoginPage.jsx – Trang đăng nhập người dùng
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      alert("🎉 Đăng nhập thành công");
      navigate("/");
    } else {
      alert("❌ Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">🔐 Đăng nhập người dùng</h2>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          required
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
