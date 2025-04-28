// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CategoryPage from "./pages/CategoryPage"; // nếu có thêm trang category
import ProfileUser from "./pages/ProfileUser";
import ProductDetail from "./components/ProductDetails";
import PromotionPage from "./components/PromotionPage";
// import CartMenu from "./components/CartMenu";
import { UserProvider } from "./context/UserContext";  // Import UserProvider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandProductPages from "./pages/BrandProductPages";
import { CartProvider } from "./context/CartContext"; // Thêm dòng này
// Thư viện Toast thông báo đẹp
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <CartProvider>
      <UserProvider> {/* Bao bọc App bằng UserProvider */}
        <ToastContainer position="top-right" autoClose={2500} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfileUser />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="category/:slug" element={<CategoryPage />} /> {/* nếu có */}
            <Route path="/brand/:brandName" element={<BrandProductPages />} />
            {/* <Route path="/cart" element={<CartMenu />} /> */}
            <Route path="/promotions" element={<PromotionPage />} />

          </Route>
        </Routes>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
