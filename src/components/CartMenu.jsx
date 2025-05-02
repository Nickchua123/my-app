import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";


export default function CartMenu({ onClose }) {
  const { cartItems, setCartItems } = useCart();
  const [loadingId, setLoadingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    api.get("/cart").then((res) => {
      const data = res.data.data || res.data || [];
      setCartItems(data);
      setSelectedIds(data.map((item) => item.id)); // chọn tất cả mặc định
    });
  }, []);

  const toggleSelect = (itemId) => {
    setSelectedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const updateQuantity = async (item, delta) => {
    if (item.quantity + delta < 1) return;
    setLoadingId(item.id);
    try {
      await api.put("/cart/update", {
        productId: item.product.id,
        quantity: item.quantity + delta,
      });
      const res = await api.get("/cart");
      const data = res.data.data || res.data;
      setCartItems(data);
    } catch (e) {
      toast.error("Cập nhật giỏ hàng thất bại!");
    }
    setLoadingId(null);
  };

  const removeItem = async (item) => {
    setLoadingId(item.id);
    try {
      await api.delete(`/cart/${item.product.id}`);
      const res = await api.get("/cart");
      const data = res.data.data || res.data;
      setCartItems(data);
      setSelectedIds((prev) => prev.filter((id) => id !== item.id));
      toast.success(`Đã xóa ${item.product.name}`);
    } catch (e) {
      toast.error("Xóa sản phẩm thất bại!");
    }
    setLoadingId(null);
  };

  const total = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-96 bg-white rounded-lg shadow-lg p-6 border border-gray-200 text-center text-gray-500 relative">
        {onClose && (
          <button className="absolute top-3 right-3 text-gray-400 hover:text-red-400" onClick={onClose}>
            <FiX size={20} />
          </button>
        )}
        <FiShoppingCart className="mx-auto text-3xl mb-2 text-gray-400" />
        <p className="font-medium text-gray-600">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white rounded-lg shadow-xl p-6 border border-gray-200 relative">
      {onClose && (
        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-400" onClick={onClose}>
          <FiX size={20} />
        </button>
      )}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <FiShoppingCart className="text-xl text-orange-500" /> Giỏ hàng của bạn
      </h3>

      <ul className="max-h-72 overflow-y-auto pr-1 custom-scrollbar">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3 border-b last:border-none">
            <input
              type="checkbox"
              className="mt-1"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
            />
            <img
              src={
                item.product.images?.[0]
                  ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                  : "/no-image.png"
              }
              alt={item.product.name}
              className="w-14 h-14 object-cover rounded border"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800 truncate">{item.product.name}</div>
              <div className="flex items-center gap-1 mt-1">
                <button
                  onClick={() => updateQuantity(item, -1)}
                  disabled={item.quantity <= 1 || loadingId === item.id}
                  className="px-2 border rounded text-sm hover:bg-gray-100 disabled:opacity-40"
                >
                  <FiChevronLeft />
                </button>
                <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, 1)}
                  disabled={loadingId === item.id}
                  className="px-2 border rounded text-sm hover:bg-gray-100 disabled:opacity-40"
                >
                  <FiChevronRight />
                </button>
                <button
                  onClick={() => removeItem(item)}
                  disabled={loadingId === item.id}
                  className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded disabled:opacity-40"
                  title="Xoá"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* <div className="flex justify-between items-center mt-5 pt-4 border-t">
        <span className="font-medium text-gray-700">Tổng cộng:</span>
        <span className="font-bold text-green-600 text-lg">₫{total.toLocaleString()}</span>
      </div> */}


      <button
        className="w-full mt-5 py-2.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
        onClick={() => {
          if (selectedIds.length === 0) {
            toast.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!", {
              position: "top-center",
              autoClose: 1500,
            });
            return;
          }

          if (onClose) onClose();
          navigate("/cart", { state: { selectedIds } });
        }}
      >
        Chọn sản phẩm thanh toán ({selectedIds.length})
      </button>
    </div>
  );
}
