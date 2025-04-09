// UserManager.jsx – Admin xem danh sách người dùng (giới hạn viewer)
import { useEffect, useState } from "react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");

  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedOrders = localStorage.getItem("orders");
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  const handleDelete = (id) => {
    if (isViewer) return;
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    }
  };

  const getOrderCount = (email) => {
    return orders.filter((o) => o.customer?.email === email).length;
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Quản lý người dùng</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên hoặc email..."
          className="border p-2 rounded w-full sm:w-96"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3 text-center">Số đơn</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.address}</td>
                  <td className="p-3 text-center">{getOrderCount(u.email)}</td>
                  <td className="p-3 text-center">
                    {!isViewer ? (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        🗑️ Xoá
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">Chỉ xem</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isViewer && (
          <p className="mt-4 text-sm text-gray-500 italic">* Bạn đang ở chế độ chỉ xem.</p>
        )}
      </div>
    </div>
  );
}