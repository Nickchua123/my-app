// src/admin/AdminDashboard.jsx
import allProducts from "../components/data/products";
import useCategories from "../hooks/useCategories";

export default function AdminDashboard() {
  const categories = useCategories();

  const totalProducts = allProducts.length;
  const totalValue = allProducts.reduce((sum, p) => sum + p.price, 0);

  const categoryStats = categories.map(({ id, label }) => {
    const count = allProducts.filter((p) => p.category === id).length;
    return { label, count };
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Bảng điều khiển Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Tổng số sản phẩm</h2>
          <p className="text-2xl font-bold text-orange-500">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Tổng giá trị tồn kho</h2>
          <p className="text-2xl font-bold text-orange-500">
            {totalValue.toLocaleString()} đ
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Phân loại theo danh mục</h2>
          <ul className="mt-2 space-y-1">
            {categoryStats.map((cat) => (
              <li key={cat.label}>
                ✅ {cat.label}: <strong>{cat.count}</strong> sản phẩm
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
