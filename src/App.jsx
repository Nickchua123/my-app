// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CategoryPage from "./pages/CategoryPage"; // nếu có thêm trang category
import ProfileUser from "./pages/ProfileUser";
import ProductDetail from "./components/ProductDetails";
import { UserProvider } from "./context/UserContext";  // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Bao bọc App bằng UserProvider */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfileUser />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="category/:slug" element={<CategoryPage />} /> {/* nếu có */}
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
