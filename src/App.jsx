import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CategoryPage from "./pages/CategoryPage";
import ProfileUser from "./pages/ProfileUser";
import ProductDetail from "./components/ProductDetails";
import PromotionPage from "./components/PromotionPage";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import BrandProductPages from "./pages/BrandProductPages";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ToastContainer } from 'react-toastify';
import PaymentResult from "./pages/PaymentResult";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import UserDashboard from "./pages/user/DashboardUser";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <ToastContainer position="bottom-right" autoClose={2500} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfileUser />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="/brand/:brandName" element={<BrandProductPages />} />
            <Route path="/promotions" element={<PromotionPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/userdashboard" element={<UserDashboard />} />

            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/vnpay/return" element={<PaymentResult />} />

          </Route>
        </Routes>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
