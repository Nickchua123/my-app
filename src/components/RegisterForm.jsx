// UserRegisterPage.jsx – Trang đăng ký người dùng
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function UserRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const success = register({ name, email, password, phone, address });
    if (success) {
      alert("🎉 Đăng ký thành công");
      navigate("/");
    } else {
      alert("❌ Email đã tồn tại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">📝 Đăng ký người dùng</h2>

        <input
          type="text"
          placeholder="Họ tên"
          required
          className="w-full p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="text"
          placeholder="Số điện thoại"
          required
          className="w-full p-3 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Địa chỉ"
          required
          className="w-full p-3 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
