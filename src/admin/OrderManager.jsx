import { useEffect, useState } from "react";
import axios from "axios";

// Lucide icons
import {
  Package,
  Truck,
  CheckCircle2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PACKING", label: "Đang đóng gói", icon: Package },
  { value: "SHIPPING", label: "Đang giao", icon: Truck },
  { value: "DELIVERED", label: "Đã giao", icon: CheckCircle2 },
];

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
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
      return `http://localhost:8080/storage/Product-${item.productId}/${item.imageUrl}`;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/orders?page=${currentPage}&size=5`)
      .then((response) => {
        setOrders(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy đơn hàng", error);
      });
  }, [currentPage]);

  const saveOrders = (data) => setOrders(data);

  const handleStatusChange = (id, newStatus) => {
    if (isViewer) return;

    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    saveOrders(updated);
    setSelectedOrder(null);

    axios
      .put(
        `http://localhost:8080/api/v1/orders/${id}/status`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        axios
          .get(`http://localhost:8080/api/v1/orders?page=${currentPage}&size=5`)
          .then((response) => {
            setOrders(response.data.data.content || []);
          })
          .catch((error) => console.error("Lỗi khi lấy đơn hàng", error));
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật trạng thái", err);
        saveOrders(orders);
      });
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Package className="w-6 h-6 text-blue-600" />
        Quản lý đơn hàng
      </h1>

      {/* Filter */}
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

      {/* Table */}
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
            {filtered.length > 0 ? (
              filtered.map((order) => {
                const StatusIcon =
                  STATUS_OPTIONS.find((s) => s.value === order.status)?.icon ||
                  Package;
                const StatusLabel =
                  STATUS_OPTIONS.find((s) => s.value === order.status)?.label ||
                  order.status;

                return (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-semibold">{order.id}</td>
                    <td className="p-3">{order.customerName}</td>
                    <td className="p-3">{order.customerPhone}</td>
                    <td className="p-3 text-orange-500 font-semibold">
                      {order.totalAmount.toLocaleString()} đ
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <StatusIcon className="w-4 h-4 text-gray-600" />
                      {StatusLabel}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                        Xem
                      </button>
                    </td>
                  </tr>
                );
              })
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
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Trước
        </button>
        <span>
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Sau
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal - Xem chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-2xl rounded p-6 relative max-h-[90vh] overflow-y-auto shadow-lg">
            <button
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Đơn hàng #{selectedOrder.id}
            </h2>

            <div className="mb-4 text-sm space-y-1">
              <p><strong>Khách:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.customerAddress}</p>
              <p><strong>Điện thoại:</strong> {selectedOrder.customerPhone}</p>
              <p>
                <strong>Thời gian:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-600" />
                Sản phẩm
              </h3>
              {selectedOrder.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 mb-2 border-b pb-2"
                >
                  <img
                    src={getImageUrl(item)}
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
                <label className="block font-semibold mb-1">
                  Trạng thái đơn hàng
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(selectedOrder.id, e.target.value)
                  }
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isViewer && (
              <p className="italic text-gray-500 mb-4">
                Bạn chỉ có quyền xem đơn hàng.
              </p>
            )}

            <p className="text-right font-bold text-lg">
              Tổng tiền: {selectedOrder.totalAmount.toLocaleString()} đ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
