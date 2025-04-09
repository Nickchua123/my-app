import { useEffect, useState } from "react";

export default function AdminForm({ onSubmit, initialData = null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const isEditing = !!initialData;

  useEffect(() => {
    setEmail(initialData?.email || "");
    setPassword(initialData?.password || "");
    setFullName(initialData?.fullName || "");
    setPhone(initialData?.phone || "");
    setAddress(initialData?.address || "");
    setRole(initialData?.role || "");
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{8,10}$/;

    const newErrors = {};
    if (!email) newErrors.email = "Email không được để trống.";
    else if (!emailRegex.test(email)) newErrors.email = "Email không hợp lệ.";

    if (!password) newErrors.password = "Mật khẩu không được để trống.";
    if (!fullName) newErrors.fullName = "Họ tên không được để trống.";
    if (!phone) newErrors.phone = "SĐT không được để trống.";
    else if (!phoneRegex.test(phone))
      newErrors.phone = "SĐT không hợp lệ. Bắt đầu bằng 0, 9–11 số.";

    if (!address) newErrors.address = "Địa chỉ không được để trống.";
    if (!role) newErrors.role = "Vui lòng chọn quyền.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = { email, password, fullName, phone, address, role };
    onSubmit(data);
  };

  const inputClass = "border p-2 rounded w-full";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "✏️ Chỉnh sửa Admin" : "➕ Thêm Admin Mới"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEditing}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className={`${inputClass} ${errors.password ? "border-red-500" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
         
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Họ tên"
            className={`${inputClass} ${errors.fullName ? "border-red-500" : ""}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Số điện thoại"
            className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Địa chỉ"
            className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <select
            className={`${inputClass} ${errors.role ? "border-red-500" : ""}`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Chọn quyền --</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
      >
        {isEditing ? "💾 Lưu thay đổi" : "✅ Thêm admin"}
      </button>
    </form>
  );
}
