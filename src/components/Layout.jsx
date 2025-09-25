import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// Bao bọc layout có header/footer
//  Fixes sau 
export default function Layout() {
  return (
    <>
      <Header />
      <main className="">
        <Outlet /> {/* Đây là nơi render các trang con như HomePage, LoginForm,... */}
      </main>
      <Footer />
    </>
  );
}
