import { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useCart } from "../context/CartContext"; // ✅ Sử dụng context thay vì cart mẫu

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({ isLoggedIn: false, name: "" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { cartItems } = useCart(); // ✅ Lấy dữ liệu thực từ context

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sampleProducts = ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C", "Sản phẩm D"];
  const suggestions = sampleProducts.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ isLoggedIn: true, name: "Nguyễn Văn A" });
    setShowLoginModal(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({ isLoggedIn: true, name: "Nguyễn Văn A" });
    setShowRegisterModal(false);
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: "" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart size={28} className="text-gray-900 dark:text-white" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Shop</h1>
          </Link>
          <button
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} className="text-gray-800 dark:text-white" />
          </button>
        </div>

        <SearchBar
          menuOpen={menuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          suggestions={suggestions}
        />

        <div className="flex items-center space-x-4 mt-4 md:mt-0 relative">
          <UserMenu
            user={user}
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
            handleLogout={handleLogout}
          />

          <CartMenu />
        </div>
      </header>

      {/* Modal đăng nhập */}
      <Modal
        show={showLoginModal}
        title="Đăng nhập"
        onClose={() => setShowLoginModal(false)}
      >
        <LoginForm handleLogin={handleLogin} />
      </Modal>

      {/* Modal đăng ký */}
      <Modal
        show={showRegisterModal}
        title="Đăng ký"
        onClose={() => setShowRegisterModal(false)}
      >
        <RegisterForm handleRegister={handleRegister} />
      </Modal>
    </>
  );
}
