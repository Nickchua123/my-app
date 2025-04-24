import { useEffect, useState } from "react";
import useCategories from "../hooks/useCategories";
import axios from "axios";

export default function AdminDashboard() {
  const categories = useCategories(); // lấy từ API /categories
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/products")
      .then((res) => {
        const data = res.data.data.result;
        console.log("📦 Sản phẩm từ BE:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy sản phẩm:", err);
      });
  }, []);


  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * (p.stockQuantity || 0)),
    0
  );
  console.log("📦 Sản phẩm:", products);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Bảng điều khiển Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Tổng số sản phẩm */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Tổng số sản phẩm</h2>
          <p className="text-2xl font-bold text-orange-500">{totalProducts}</p>
        </div>

        {/* Tổng giá trị tồn kho */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Tổng giá trị tồn kho</h2>
          <p className="text-2xl font-bold text-orange-500">
            {totalValue.toLocaleString()} đ
          </p>
        </div>

        {/* Phân loại theo danh mục */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Phân loại theo danh mục</h2>
          <ul className="mt-2 space-y-1">
            {categories.map(({ id, label }) => {
              //  Dùng .? vì để tránh lỗi nếu p.category là null hoặc undefined 
              const count = products.filter((p) => p.category?.id === id).length;
              if (count === 0) return null;
              return (
                <li key={id}>
                  ✅ {label}: <strong>{count}</strong> sản phẩm
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    </div>
  );
}
