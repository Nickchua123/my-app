import { useEffect, useState } from "react";
import AdminForm from "./AdminForm";

export default function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const current = localStorage.getItem("currentAdmin");

  useEffect(() => {
    const stored = localStorage.getItem("admins");
    if (stored) {
      setAdmins(JSON.parse(stored));
    } else {
      const defaultAdmins = [
        {
          email: "admin@gmail.com",
          password: "admin123",
          fullName: "Quản trị viên",
          phone: "0123456789",
          address: "Hà Nội",
          role: "admin",
        },
      ];
      localStorage.setItem("admins", JSON.stringify(defaultAdmins));
      setAdmins(defaultAdmins);
    }
  }, []);

  const saveAdmins = (data) => {
    localStorage.setItem("admins", JSON.stringify(data));
    setAdmins(data);
  };

  const handleAddOrUpdate = (adminData) => {
    const isEditing = !!editData;
    if (isEditing) {
      const updated = admins.map((a) =>
        a.email === editData.email ? { ...a, ...adminData } : a
      );
      saveAdmins(updated);
      alert("✅ Đã cập nhật thông tin admin.");
    } else {
      if (admins.find((a) => a.email === adminData.email)) {
        alert("Email đã tồn tại.");
        return;
      }
      saveAdmins([...admins, adminData]);
      alert("✅ Đã thêm admin mới.");
    }

    setEditData(null);
    setShowForm(false);
  };

  const handleDelete = (targetEmail) => {
    if (targetEmail === current)
      return alert("Không thể xoá chính bạn đang đăng nhập.");
    if (window.confirm("Bạn có chắc chắn muốn xoá admin này?")) {
      const filtered = admins.filter((a) => a.email !== targetEmail);
      saveAdmins(filtered);
    }
  };

  const filteredAdmins =
    roleFilter === "all"
      ? admins
      : admins.filter((a) => a.role === roleFilter);

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">👥 Quản lý tài khoản Admin</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ Thêm Admin
        </button>

        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">📋 Tất cả quyền</option>
          <option value="admin">🛠️ Admin</option>
          <option value="manager">📁 Manager</option>
          <option value="viewer">👀 Viewer</option>
        </select>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>
            <AdminForm
              key={editData?.email || "new"} // ✅ Force re-render khi chuyển giữa Thêm & Sửa
              onSubmit={handleAddOrUpdate}
              initialData={editData}
            />
          </div>
        </div>
      )}

      <table className="w-full bg-white shadow-md rounded overflow-hidden text-sm mt-4">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">SĐT</th>
            <th className="p-3">Địa chỉ</th>
            <th className="p-3">Quyền</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.email} className="border-t">
              <td className="p-3">{admin.email}</td>
              <td className="p-3">{admin.fullName}</td>
              <td className="p-3">{admin.phone}</td>
              <td className="p-3">{admin.address}</td>
              <td className="p-3 capitalize">{admin.role}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => {
                    setEditData(admin);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️ Sửa
                </button>
                {admin.email !== current && (
                  <button
                    onClick={() => handleDelete(admin.email)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Xoá
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
