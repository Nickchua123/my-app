// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../Config/axiosConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart từ API khi khởi tạo
  useEffect(() => {
    api.get("/cart")
      .then((res) => {
        setCartItems(res.data.data || res.data || []);
      })
      .catch((err) => {
        console.error("Lỗi khi load giỏ hàng:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Thêm sản phẩm
  const addToCart = (product, quantity = 1) => {
    // Có thể gọi POST /cart ở đây nếu muốn đồng bộ luôn
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
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`); // gọi backend xóa
      const res = await api.get("/cart"); // cập nhật lại giỏ hàng sau khi xóa
      setCartItems(res.data.data || res.data || []);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", err);
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
