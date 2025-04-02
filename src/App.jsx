// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/category/:slug" element={<CategoryPage />} />
        {/* Thêm các route khác nếu có */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
