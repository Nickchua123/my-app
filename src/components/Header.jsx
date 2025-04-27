import { useState } from "react";
import CartMenu from "../components/CartMenu"; // Import ở đầu file
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Header() {
  const { cartItems } = useCart();    // lấy cartItems từ context!
  const [showCartMenu, setShowCartMenu] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // ...code khác giữ nguyên

  return (
    <header className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* ...các nav khác giữ nguyên */}

        {/* Cart icon + Mini Cart */}
        <div className="relative"
          onMouseEnter={() => setShowCartMenu(true)}
          onMouseLeave={() => setShowCartMenu(false)}
        >
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {showCartMenu && <CartMenu />}
        </div>
      </div>
    </header>
  );
}
