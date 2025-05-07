import { useEffect, useState } from "react";
import api from "../Config/axiosConfig";  // Import axios instance đã cấu hình
import AdminForm from "./AdminForm";

export default function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [totalItems, setTotalItems] = useState(0); // Tổng số items
  const current = localStorage.getItem("currentAdmin");

  useEffect(() => {
    // Gọi API để lấy dữ liệu với phân trang
    api.get(`/users?page=${currentPage - 1}&size=3`)  // Gửi request với trang hiện tại và số lượng item mỗi trang
      .then((response) => {
        setAdmins(response.data.data.result); // Dữ liệu admin

        setTotalPages(response.data.data.meta.pages); // Số trang
        setTotalItems(response.data.data.totalItems); // Tổng số item
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, [currentPage]);  // Gọi lại mỗi khi trang thay đổi

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddOrUpdate = async (adminData) => {
    const isEditing = !!editData;
    let updated;
    try {
      if (isEditing) {
        updated = admins.map((admin) =>
          admin.email === editData.email ? { ...admin, ...adminData } : admin
        );
      } else {
        if (admins.some((admin) => admin.email === adminData.email)) {
          alert("❌ Email đã tồn tại. Vui lòng dùng email khác.");
          return;
        }
        updated = [adminData, ...admins];  // Thêm người dùng mới vào đầu danh sách
        alert("✅ Thêm mới thành công.");
      }

      setAdmins(updated);  // Cập nhật lại danh sách admin
      setShowForm(false);
      setEditData(null);
      setCurrentPage(1);  // Quay lại trang đầu khi thêm admin mới

      // Không cần gọi api.post() ở đây nữa, đã thực hiện trong AdminForm.jsx

    } catch (error) {
      console.error(error);
      alert("❌ Đã có lỗi xảy ra khi tạo tài khoản.");
    }
  };


  const handleDelete = (id) => {
    if (id === current) {
      alert("⚠️ Không thể xoá chính tài khoản đang đăng nhập.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xoá admin này?")) {
      // Gửi yêu cầu xóa admin từ backend bằng ID
      api.delete(`/users/${id}`)  // Gửi yêu cầu xóa admin từ backend
        .then(() => {
          setAdmins(admins.filter((admin) => admin.id !== id)); // Cập nhật lại danh sách admins
          alert("🗑️ Đã xoá admin thành công.");
        })
        .catch((error) => {
          console.error("Lỗi khi xóa admin:", error);
          alert("❌ Có lỗi khi xóa admin.");
        });
    }
  };


  // Lọc admin theo vai trò
  const filteredAdmins =
    roleFilter === "all"
      ? admins
      : admins.filter((admin) => admin.role.name === roleFilter);  // Kiểm tra admin.role trước khi truy cập name

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
          <option value="ADMIN">🛠️ Admin</option>
          <option value="MANAGE">📁 Manager</option>
          <option value="USER">👀 Người dùng</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3">Quyền</th>
              <th className="p-3 text-center">Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.email} className="border-t hover:bg-gray-50">
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.address}</td>
                <td className="p-3 capitalize">{admin.role?.name || "Không có vai trò"}</td>
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
                      onClick={() => handleDelete(admin.id)}
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

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          &lt; Trước
        </button>
        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Sau &gt;
        </button>
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
