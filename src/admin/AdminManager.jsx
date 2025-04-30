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
    let updated;
    if (isEditing) {
      updated = admins.map((admin) =>
        admin.email === editData.email ? { ...admin, ...adminData } : admin
      );
      alert("✅ Cập nhật admin thành công.");
    } else {
      if (admins.some((admin) => admin.email === adminData.email)) {
        alert("❌ Email đã tồn tại. Vui lòng dùng email khác.");
        return;
      }
      updated = [...admins, adminData];
      alert("✅ Thêm admin mới thành công.");
    }
    saveAdmins(updated);
    setShowForm(false);
    setEditData(null);
  };

  const handleDelete = (email) => {
    if (email === current) {
      alert("⚠️ Không thể xoá chính tài khoản đang đăng nhập.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xoá admin này?")) {
      const updated = admins.filter((admin) => admin.email !== email);
      saveAdmins(updated);
      alert("🗑️ Đã xoá admin thành công.");
    }
  };

  const filteredAdmins =
    roleFilter === "all"
      ? admins
      : admins.filter((admin) => admin.role === roleFilter);

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">👥 Quản lý tài khoản Admin</h1>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <button
          onClick={() => {
            setShowForm(true);
            setEditData(null);
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
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
              <tr key={admin.email} className="border-t hover:bg-gray-50">
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
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
              key={editData?.email || "new"}
              onSubmit={handleAddOrUpdate}
              initialData={editData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
