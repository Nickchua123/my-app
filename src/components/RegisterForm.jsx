import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(form);
    if (success) {
      alert("🎉 Đăng ký thành công. Mời bạn đăng nhập!");
      navigate("/login");
    } else {
      alert("❌ Đăng ký thất bại. Email có thể đã tồn tại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-green-600">Đăng ký tài khoản</h2>

        {["name", "email", "password", "phone", "address"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-600 mb-1 capitalize">
              {field === "name" ? "Họ tên" : field === "password" ? "Mật khẩu" : field}
            </label>
            <input
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              placeholder={field}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400"
              required
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition duration-300"
        >
          Đăng ký
        </button>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline">
            Đăng nhập
          </a>
        </p>
      </form>
    </div>
  );
}
