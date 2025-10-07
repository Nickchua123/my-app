import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";

export default function CartMenu({ onClose }) {
  const { cartItems, setCartItems } = useCart();
  const [loadingId, setLoadingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    api.get("/cart").then((res) => {
      const data = res.data.data || res.data || [];
      setCartItems(data);
      setSelectedIds(data.map((item) => item.id));
    });
  }, []);

  // ✅ Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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
      setCartItems(res.data.data || res.data);
    } catch {
      toast.error("Cập nhật giỏ hàng thất bại!");
    }
    setLoadingId(null);
  };

  const removeItem = async (item) => {
    setLoadingId(item.id);
    try {
      await api.delete(`/cart/${item.product.id}`);
      const res = await api.get("/cart");
      setCartItems(res.data.data || res.data);
      setSelectedIds((prev) => prev.filter((id) => id !== item.id));
      toast.success(`Đã xóa ${item.product.name}`);
    } catch {
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

  // =================== CART EMPTY ===================
  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="w-96 bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center text-gray-500 relative"
      >
        {onClose && (
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        )}
        <ShoppingCart className="mx-auto text-black text-4xl mb-3 text-gray-400" />
        <p className="font-medium text-gray-600">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  // =================== CART WITH ITEMS ===================
  return (
    <div
      ref={dropdownRef}
      className="w-96 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 relative"
    >
      {onClose && (
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      )}

      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center gap-2">
        <ShoppingCart className="text-xl text-black-500" /> Giỏ hàng của bạn
      </h3>

      <ul className="max-h-72 overflow-y-auto pr-2 custom-scrollbar divide-y divide-gray-100">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-3 transition hover:bg-gray-50 rounded-lg px-1"
          >
            <button
              onClick={() => toggleSelect(item.id)}
              className="text-gray-500 hover:text-blue-500"
            >
              {selectedIds.includes(item.id) ? (
                <CheckSquare size={20} />
              ) : (
                <Square size={20} />
              )}
            </button>

            <img
              src={
                item.product.images?.[0]
                  ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                  : "/no-image.png"
              }
              alt={item.product.name}
              className="w-14 h-14 object-cover rounded-md border border-gray-200"
            />

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">
                {item.product.name}
              </div>
              <div className="text-sm text-gray-500">
                ₫{(item.product.price || 0).toLocaleString()}
              </div>

              <div className="flex items-center gap-1 mt-1">
                <button
                  onClick={() => updateQuantity(item, -1)}
                  disabled={item.quantity <= 1 || loadingId === item.id}
                  className="px-2 border rounded text-sm hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-2 text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item, 1)}
                  disabled={loadingId === item.id}
                  className="px-2 border rounded text-sm hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => removeItem(item)}
                  disabled={loadingId === item.id}
                  className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded disabled:opacity-40"
                  title="Xoá"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-5 pt-4 border-t">
        <span className="font-medium text-gray-700">Tổng cộng:</span>
        <span className="font-bold text-black text-lg">
          ₫{total.toLocaleString()}
        </span>
      </div>

      <button
        className="w-full mt-5 py-2.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
        onClick={() => {
          if (selectedIds.length === 0) {
            toast.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!", {
              position: "top-center",
              autoClose: 1500,
            });
            return;
          }

          onClose?.();
          navigate("/cart", { state: { selectedIds } });
        }}
      >
        Thanh toán ({selectedIds.length})
      </button>
    </div>
  );
}
