// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../Config/axiosConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasToken = !!localStorage.getItem("accessToken"); // kiểm tra login

  // Fetch cart từ API khi user đã đăng nhập
  useEffect(() => {
    if (!hasToken) {
      setLoading(false);
      return; // không gọi API nếu chưa login
    }

    api.get("/cart")
      .then((res) => {
        setCartItems(res.data.data || res.data || []);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi load giỏ hàng:", err);
      })
      .finally(() => setLoading(false));
  }, [hasToken]);

  // Thêm sản phẩm
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });

    // Tuỳ bạn: có thể gọi POST /cart ở đây để đồng bộ luôn
  };

  // Xoá sản phẩm
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      const res = await api.get("/cart");
      setCartItems(res.data.data || res.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng:", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
