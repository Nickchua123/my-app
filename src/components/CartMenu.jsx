import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

export default function CartMenu({ onClose }) {
  const { cartItems, setCartItems } = useCart();
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  // Cập nhật số lượng
  const updateQuantity = async (item, delta) => {
    if (item.quantity + delta < 1) return;
    setLoadingId(item.id);
    try {
      await api.put("/cart/update", {
        productId: item.product.id,
        quantity: item.quantity + delta
      });
      const res = await api.get("/cart");
      setCartItems(res.data.data || res.data);
    } catch (e) {
      toast.error("Cập nhật giỏ hàng thất bại!");
    }
    setLoadingId(null);
  };

  // Xóa sản phẩm
  const removeItem = async (item) => {
    setLoadingId(item.id);
    try {
      await api.delete(`/cart/${item.product.id}`);
      const res = await api.get("/cart");
      setCartItems(res.data.data || res.data);
      toast.success(`Đã xóa ${item.product.name} khỏi giỏ hàng!`);
    } catch (e) {
      toast.error("Xóa sản phẩm thất bại!");
    }
    setLoadingId(null);
  };

  const total = cartItems?.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0), 0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-96 bg-white rounded-2xl shadow-xl p-7 border border-orange-200 text-center text-gray-500 min-h-[180px] flex flex-col justify-center relative">
        {onClose && (
          <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400" onClick={onClose}>
            <FiX size={22} />
          </button>
        )}
        <FiShoppingCart className="mx-auto text-4xl mb-3 text-orange-400" />
        <div className="font-semibold">Giỏ hàng trống.</div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white rounded-2xl shadow-2xl p-7 border border-orange-200 animate-fade-in relative">
      {onClose && (
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400" onClick={onClose}>
          <FiX size={22} />
        </button>
      )}
      <h3 className="font-semibold text-lg mb-4 text-center tracking-wide text-orange-500 flex items-center gap-2 justify-center">
        <FiShoppingCart className="text-xl" /> Giỏ hàng của bạn
      </h3>
      <ul className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {cartItems.map(item => (
          <li
            key={item.id}
            className={`flex items-center gap-3 py-3 border-b last:border-none group transition-all duration-100`}
          >
            <img
              src={
                item.product.images?.[0]
                  ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                  : "/no-image.png"
              }
              alt={item.product.name}
              className="w-14 h-14 object-cover rounded-lg border border-gray-200 bg-white transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.product.name}</div>
              <div className="flex items-center gap-1 mt-1">
                <button
                  disabled={item.quantity <= 1 || loadingId === item.id}
                  onClick={() => updateQuantity(item, -1)}
                  className="px-2 border rounded bg-gray-50 hover:bg-orange-100 transition disabled:opacity-40"
                >
                  <FiChevronLeft />
                </button>
                <span className="mx-2 font-semibold">{item.quantity}</span>
                <button
                  disabled={loadingId === item.id}
                  onClick={() => updateQuantity(item, 1)}
                  className="px-2 border rounded bg-gray-50 hover:bg-orange-100 transition disabled:opacity-40"
                >
                  <FiChevronRight />
                </button>
                <button
                  disabled={loadingId === item.id}
                  onClick={() => removeItem(item)}
                  className="ml-2 p-1 text-red-500 border-none rounded hover:bg-red-50 transition disabled:opacity-40"
                  title="Xóa sản phẩm"
                >
                  <FiX size={18} />
                </button>
                {loadingId === item.id && (
                  <span className="ml-2 animate-spin text-xs text-gray-400">⏳</span>
                )}
              </div>
            </div>
            <div className="font-bold text-orange-600 whitespace-nowrap text-right pl-1">
              ₫{(item.product.price * item.quantity).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <span className="font-semibold">Tổng cộng:</span>
        <span className="font-bold text-green-600 text-lg">
          ₫{total.toLocaleString()}
        </span>
      </div>
      <button
        className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold shadow hover:opacity-90 transition"
        onClick={() => {
          if (onClose) onClose();
          navigate("/checkout"); // hoặc navigate("/cart/checkout")
        }}
      >
        Thanh toán
      </button>
    </div>
  );
}
