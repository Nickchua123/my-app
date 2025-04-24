import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// Bao bọc layout có header/footer
export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet /> {/* Đây là nơi render các trang con như HomePage, LoginForm,... */}
      </main>
      <Footer />
    </>
  );
}
