import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../Config/axiosConfig";
import { FiLogIn } from "react-icons/fi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let formErrors = { email: "", password: "" };
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) formErrors.email = "Email không được để trống.";
    else if (!emailRegex.test(email)) formErrors.email = "Email không hợp lệ.";

    if (!password) formErrors.password = "Mật khẩu không được để trống.";
    else if (password.length < 6)
      formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await login(email, password, "USER");
    if (success) {
      alert("🎉 Đăng nhập thành công");
      fetchUser(email);
      navigate("/");
    } else {
      alert("❌ Email hoặc mật khẩu không đúng");
    }
  };

  const fetchUser = async (email) => {
    try {
      const response = await api.get(`/${email}`);
      const userRole = response.data.data.role.name;
      localStorage.setItem("role", userRole);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-300 from-indigo-100 via-white to-blue-100 ">
      {/* Breadcrumb */}
      <div className="w-full max-w-5xl mb-6">
        <p className="text-gray-500 text-sm">
          Home <span className="mx-1">›</span> Login
        </p>
        <h1 className="text-3xl font-extrabold mt-2 text-gray-800">
          Customer Login
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left: Form */}
        <form
          onSubmit={handleLogin}
          className="p-10 space-y-6 border-r border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Registered Customers
          </h2>
          <p className="text-sm text-gray-500">
            If you have an account, please log in.
          </p>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={`w-full mt-1 border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            <FiLogIn size={20} /> Sign In
          </button>

          {/* Forgot password */}
          <div className="w-full flex justify-center ">
            <Link
              to="#"
              className="text-sm text-black-600 hover:text-black-700 underline transition"
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        {/* Right: New Customer */}
        <div className="p-10 flex flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            New Customer?
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Creating an account has many benefits:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-6">
            <li>Check out faster</li>
            <li>Save multiple addresses</li>
            <li>Track orders and more</li>
          </ul>
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition text-center"
          >
            Create An Account
          </Link>
        </div>
      </div>
    </div>
  );
}
