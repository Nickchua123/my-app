import { useState, useEffect } from "react";
import axios from "../Config/axiosConfig";  // Import axios hoặc API service của bạn

export default function AdminForm({ onSubmit, initialData = null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");  // Sử dụng fullName thay vì name
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("ADMIN"); // Default role is 'admin'
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email);
      setFullName(initialData.fullName);  // Cập nhật với fullName
      setPhone(initialData.phone);
      setAddress(initialData.address);
      setRole(initialData.role);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let roleData = {};

    if (role === "ADMIN") {
      roleData = { id: 1, name: "ADMIN" };
    } else if (role === "MANAGE") {
      roleData = { id: 3, name: "MANAGE" };
    } else if (role === "USER") {
      roleData = { id: 2, name: "USER" };
    }

    const userData = {
      email,
      password,
      name: fullName,  // Change `fullName` to `name`
      address,
      phone,
      role: roleData,  // Gửi role dưới dạng đối tượng
    };
    console.log("Dữ liệu gửi đi: ", userData);  // Kiểm tra dữ liệu

    try {
      let response;
      //  console.log(userData);  // Kiểm tra dữ liệu gửi lên backend
      console.log("Vai trò hiện tại: ", role);
      console.log("Dữ liệu gửi đi: ", userData);

      // Gửi yêu cầu tạo người dùng hoặc admin tùy theo vai trò
      if (role == "ADMIN") {
        response = await axios.post("http://localhost:8080/api/v1/createAdmin", userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }
      else if (role == "MANAGE") {
        response = await axios.post("http://localhost:8080/api/v1/createManage", userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      } else {
        response = await axios.post("http://localhost:8080/api/v1/createUser", userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }

      if (response.status === 201) {
        // alert("✅ Tạo tài khoản thành công.");
        onSubmit(userData); // Lý do tại sao dùng onSubmit, bạn có thể gọi callback nếu cần xử lý sau khi thành công
      } else {
        alert("❌ Có lỗi khi tạo tài khoản.");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Đã có lỗi xảy ra khi tạo tài khoản.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        {initialData ? "Cập nhật" : "Thêm"} Tài Khoản Admin
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="admin@example.com"
            disabled={initialData ? true : false}
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <span
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* Heroicons */}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Họ tên</label>
          <input
            type="text"
            value={fullName}  // Sử dụng fullName ở đây
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">SĐT</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="ADMIN">Admin</option>
            <option value="MANAGE">Nhân viên</option>
            <option value="USER">Người dùng</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {initialData ? "Cập nhật" : "Thêm"} Admin
        </button>
      </div>
    </form>
  );
}
