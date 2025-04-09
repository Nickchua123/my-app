// OrderManager.jsx - Quản lý đơn hàng (ẩn nút sửa nếu viewer)
import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  { value: "pending", label: "🕒 Chờ xác nhận" },
  { value: "shipping", label: "🚚 Đang giao" },
  { value: "completed", label: "✅ Đã giao" },
  { value: "cancelled", label: "❌ Đã huỷ" },
];

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      const dummy = [
        {
          id: "DH1001",
          createdAt: new Date().toISOString(),
          customer: {
            name: "Nguyễn Văn A",
            phone: "0912345678",
            email: "a@gmail.com",
            address: "Hà Nội",
          },
          items: [
            {
              id: 1,
              name: "Laptop Dell",
              price: 20000000,
              quantity: 1,
              imageUrl: "https://via.placeholder.com/80",
            },
          ],
          total: 20000000,
          status: "pending",
        },
      ];
      setOrders(dummy);
      localStorage.setItem("orders", JSON.stringify(dummy));
    }
  }, []);

  const saveOrders = (data) => {
    localStorage.setItem("orders", JSON.stringify(data));
    setOrders(data);
  };

  const handleStatusChange = (id, newStatus) => {
    if (isViewer) return;
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    saveOrders(updated);
    setSelectedOrder(null);
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Quản lý đơn hàng</h1>

      <div className="flex justify-between items-center mb-4">
        <span>Tổng: {filtered.length} đơn</span>
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Mã đơn</th>
              <th className="p-3">Khách</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{order.id}</td>
                <td className="p-3">{order.customer.name}</td>
                <td className="p-3">{order.customer.phone}</td>
                <td className="p-3 text-orange-500 font-semibold">
                  {order.total.toLocaleString()} đ
                </td>
                <td className="p-3 capitalize">
                  {STATUS_OPTIONS.find((s) => s.value === order.status)?.label ||
                    order.status}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    👁️ Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-2xl rounded p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">🧾 Đơn hàng {selectedOrder.id}</h2>

            <div className="mb-4 text-sm space-y-1">
              <p><strong>Khách:</strong> {selectedOrder.customer.name}</p>
              <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.customer.address}</p>
              <p><strong>Điện thoại:</strong> {selectedOrder.customer.phone}</p>
              <p><strong>Thời gian:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">🛒 Sản phẩm:</h3>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-2 border-b pb-2">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Giá: {item.price.toLocaleString()} đ</p>
                  </div>
                </div>
              ))}
            </div>

            {!isViewer && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">📝 Trạng thái đơn hàng:</label>
                <select
                  className="border p-2 rounded w-full"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}

            {isViewer && (
              <p className="italic text-gray-500 mb-4">Bạn chỉ có quyền xem đơn hàng.</p>
            )}

            <p className="text-right font-bold text-lg">
              💰 Tổng tiền: {selectedOrder.total.toLocaleString()} đ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
