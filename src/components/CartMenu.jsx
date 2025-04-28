import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function CartMenu({ showCheckoutBtn }) {
  const { cartItems, setCartItems } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (item, delta) => {
    if (item.quantity + delta < 1) return;
    setLoadingId(item.id);
    try {
      await api.post("/cart/update", {
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

  // Xóa sản phẩm khỏi giỏ hàng
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

  // Tính tổng tiền giỏ hàng
  const total = cartItems?.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0), 0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-96 bg-white rounded-xl shadow-xl p-6 border border-orange-200 text-center text-gray-500 min-h-[160px] flex flex-col justify-center">
        <span className="text-4xl mb-2">🛒</span>
        Giỏ hàng trống.
      </div>
    );
  }

  return (
    <div className="w-96 bg-white rounded-xl shadow-xl p-6 border border-orange-200 animate-fade-in">
      <h3 className="font-semibold text-lg mb-3 text-center">Sản phẩm trong giỏ</h3>
      <ul className="max-h-64 overflow-y-auto pr-1">
        {cartItems.map(item => (
          <li key={item.id} className="flex items-center gap-3 py-3 border-b last:border-none">
            <img
              src={
                item.product.images?.[0]
                  ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                  : "/no-image.png"
              }
              alt={item.product.name}
              className="w-14 h-14 object-cover rounded-lg border border-gray-200 bg-white"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.product.name}</div>
              <div className="flex items-center gap-1 mt-1">
                <button
                  disabled={item.quantity <= 1 || loadingId === item.id}
                  onClick={() => updateQuantity(item, -1)}
                  className="px-2 border rounded disabled:opacity-50"
                >-</button>
                <span className="mx-2 font-semibold">{item.quantity}</span>
                <button
                  disabled={loadingId === item.id}
                  onClick={() => updateQuantity(item, 1)}
                  className="px-2 border rounded disabled:opacity-50"
                >+</button>
                <button
                  disabled={loadingId === item.id}
                  onClick={() => removeItem(item)}
                  className="ml-3 px-2 py-1 border rounded text-red-600 text-xs hover:bg-red-50 disabled:opacity-50"
                >Xóa</button>
              </div>
            </div>
            <div className="font-bold text-orange-600 whitespace-nowrap text-right pl-1">
              ₫{(item.product.price * item.quantity).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-5 pt-3 border-t">
        <span className="font-semibold">Tổng cộng:</span>
        <span className="font-bold text-green-600 text-lg">
          ₫{total.toLocaleString()}
        </span>
      </div>
      {showCheckoutBtn && (
        <Link
          to="/cart"
          className="block mt-5 py-2 bg-orange-500 text-white text-center rounded hover:bg-orange-600 transition font-semibold"
        >
          Xem giỏ hàng & Thanh toán
        </Link>
      )}
    </div>
  );
}
