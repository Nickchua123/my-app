import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role is USER
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { login } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "", role: "" });

  // Hàm xử lý validation
  const validateForm = () => {
    let formErrors = { email: "", password: "", role: "" };

    // Kiểm tra email có đúng định dạng không
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) formErrors.email = "Email không được để trống.";
    else if (!emailRegex.test(email)) formErrors.email = "Email không hợp lệ.";

    // Kiểm tra mật khẩu
    if (!password) formErrors.password = "Mật khẩu không được để trống.";
    else if (password.length < 6) formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    // Kiểm tra role
    if (!role) formErrors.role = "Vui lòng chọn vai trò.";

    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;  // Only proceed if the form is valid

    const success = await login(email, password, role); // Thêm role vào login
    if (success) {
      alert("🎉 Đăng nhập thành công");
      // Chuyển hướng đến trang Admin nếu role là "ADMIN", hoặc trang User nếu role là "USER"
      if (role === "ADMIN") {
        navigate("/admin"); // Chuyển hướng đến trang admin
      } else {
        navigate("/"); // Chuyển hướng đến trang user
      }
    } else {
      alert("❌ Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Đăng nhập</h2>

        {/* Input Email */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Input Password */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-600">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️"}
            </span>
          </div>
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Role Selection */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-600">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition duration-300"
        >
          Đăng nhập
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </form>
    </div>
  );
}
