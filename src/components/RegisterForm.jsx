import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react";

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

  // Map field -> icon
  const fieldMap = [
    { name: "name", label: "Họ tên", icon: User },
    { name: "email", label: "Email", icon: Mail },
    { name: "password", label: "Mật khẩu", icon: Lock },
    { name: "phone", label: "Số điện thoại", icon: Phone },
    { name: "address", label: "Địa chỉ", icon: MapPin },
  ];

  return (
    <div className="h-screen  flex items-center justify-center bg-gray-300 ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Cột trái: Form đăng ký */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tạo tài khoản</h2>
          <p className="text-gray-600 mb-6">Vui lòng điền thông tin để đăng ký.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fieldMap.map(({ name, label, icon: Icon }) => (
              <div key={name} className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={
                      name === "password"
                        ? "password"
                        : name === "email"
                          ? "email"
                          : "text"
                    }
                    name={name}
                    placeholder={label}
                    className="w-full border border-gray-300 pl-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    required
                    value={form[name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition duration-300"
            >
              Đăng ký
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>

        {/* Cột phải: giới thiệu */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tại sao nên đăng ký?</h3>
          <ul className="text-gray-600 space-y-2 mb-6 text-left">
            <li>✔️ Mua hàng nhanh hơn</li>
            <li>✔️ Lưu nhiều địa chỉ</li>
            <li>✔️ Theo dõi đơn hàng dễ dàng</li>
          </ul>
          <p className="text-gray-500 text-sm">Gia nhập cộng đồng ngay hôm nay 🚀</p>
        </div>
      </div>
    </div>
  );
}
