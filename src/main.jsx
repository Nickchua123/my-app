import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import "./index.css";
//  Nơi khởi tạo cho toàn bộ ứng dụng
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Tất cả user page */}
        <Route path="/*" element={<App />} />
        {/* Trang admin, mọi url /admin sẽ vào hệ thống admin */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  </StrictMode>
);
