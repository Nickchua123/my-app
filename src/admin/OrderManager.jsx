import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = [
  { value: "PACKING", label: "📦 Đang đóng gói" },
  { value: "SHIPPING", label: "🚚 Đang giao" },
  { value: "DELIVERED", label: "✅ Đã giao" },
  // { value: "CANCELLED", label: "❌ Đã huỷ" },
];

export default function OrderManager() {
  const [orders, setOrders] = useState([]); // Khởi tạo orders là mảng rỗng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  const getImageUrl = (item) => {
    if (item && item.imageUrl) {
      return `http://localhost:8080/storage/Product-${item.productId}/${item.imageUrl}`; // Đường dẫn đến ảnh của sản phẩm
    }
    return "https://via.placeholder.com/300x200?text=No+Image"; // Ảnh mặc định nếu không có ảnh
  };

  useEffect(() => {
    // Fetch orders with pagination
    axios.get(`http://localhost:8080/api/v1/orders?page=${currentPage}&size=5`)
      .then((response) => {
        setOrders(response.data.data.content || []); // Đảm bảo là mảng
        setTotalPages(response.data.data.totalPages); // Set tổng số trang
      })
      .catch((error) => {
        console.error("Lỗi khi lấy đơn hàng", error);
      });
  }, [currentPage]);

  const saveOrders = (data) => {
    setOrders(data);
  };
  const handleStatusChange = (id, newStatus) => {
    if (isViewer) return;

    // Cập nhật trạng thái trên frontend trước
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    saveOrders(updated);
    setSelectedOrder(null);

    // Gửi yêu cầu PUT tới backend với content-type là application/json
    axios
      .put(
        `http://localhost:8080/api/v1/orders/${id}/status`,
        { status: newStatus },  // Gửi đối tượng JSON với key là "status"
        { headers: { 'Content-Type': 'application/json' } }  // Đảm bảo content-type là application/json
      )
      .then((response) => {
        console.log("Trạng thái đơn hàng đã được cập nhật:", response.data);
        // Fetch lại dữ liệu sau khi cập nhật để đồng bộ trạng thái
        axios.get(`http://localhost:8080/api/v1/orders?page=${currentPage}&size=5`)
          .then((response) => {
            setOrders(response.data.data.content || []); // Đảm bảo là mảng
          })
          .catch((error) => {
            console.error("Lỗi khi lấy đơn hàng", error);
          });
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật trạng thái", err);
        saveOrders(orders); // Khôi phục trạng thái cũ nếu có lỗi
      });
  };





  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  //  Hàm update status 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Quản lý đơn hàng</h1>

      <div className="flex justify-between items-center mb-4">
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
            {filtered && filtered.length > 0 ? (
              filtered.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-semibold">{order.id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.customerPhone}</td>
                  <td className="p-3 text-orange-500 font-semibold">
                    {order.totalAmount} đ
                  </td>
                  <td className="p-3 capitalize">
                    {STATUS_OPTIONS.find((s) => s.value === order.shippingStatus)?.label ||
                      order.status}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)} // Khi nhấn, set selectedOrder
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      👁️ Xem
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Trang {currentPage + 1} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Modal - Xem chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-2xl rounded p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
              onClick={() => setSelectedOrder(null)} // Đóng modal khi nhấn nút "×"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">🧾 Đơn hàng {selectedOrder.id}</h2>

            <div className="mb-4 text-sm space-y-1">
              <p><strong>Khách:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.customerAddress}</p>
              <p><strong>Điện thoại:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>Thời gian:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">🛒 Sản phẩm:</h3>
              {selectedOrder.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 mb-2 border-b pb-2">
                  <img
                    src={getImageUrl(item)}  // Gọi hàm getImageUrl để lấy URL ảnh đúng
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded border shadow-sm"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.productName}</p>
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
              💰 Tổng tiền: {selectedOrder.totalAmount} đ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
