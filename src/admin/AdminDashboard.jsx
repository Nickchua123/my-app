import { useEffect, useState } from "react";
import useCategories from "../hooks/useCategories";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";


const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#8884D8", "#FF6666"];

export default function AdminDashboard() {
  const categories = useCategories(); // lấy từ API /categories
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/products")
      .then((res) => {
        const data = res.data.data.result;
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

  // Dữ liệu cho biểu đồ
  const pieData = categories.map(({ id, label }) => {
    const count = products.filter(p => p.category?.id === id).length;
    return {
      name: label,
      value: count
    };
  }).filter(d => d.value > 0);

  const topProducts = [...products]
    .sort((a, b) => (b.stockQuantity || 0) - (a.stockQuantity || 0))
    .slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Bảng thống kê </h1>

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
            {categories.map(({ id, label }) => {
              const count = products.filter(p => p.category?.id === id).length;
              if (count === 0) return null;
              return (
                <li key={id}>✅ {id}: <strong>{count}</strong> sản phẩm</li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Biểu đồ phân loại và tổng doanh thu theo sản phẩm */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-8">

        {/* Biểu đồ phân loại */}
        {/* Biểu đồ phân loại - nhỏ hơn */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Biểu đồ sản phẩm theo danh mục</h2>
          <PieChart width={320} height={240}>
            <Pie
              data={pieData}
              cx={160}
              cy={120}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Biểu đồ doanh thu - to rõ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 sản phẩm có doanh thu cao nhất</h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={[...products]
                .map(p => ({
                  name: p.name,
                  revenue: (p.price || 0) * (p.stockQuantity || 0),
                }))
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
              }
              margin={{ top: 2, right: 30, left: 40, bottom: 80 }}
            >
              <XAxis dataKey="name" interval={0} angle={-25} dy={40} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip formatter={(v) => `${v.toLocaleString()} đ`} />
              <Legend verticalAlign="top" align="right" height={36} />

              <Bar dataKey="revenue" fill="#ff7300" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>


      {/* Top sản phẩm tồn kho nhiều
      <div className="bg-white p-6 rounded-lg shadow max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Top 5 sản phẩm tồn kho cao nhất</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">#</th>
              <th className="p-2">Tên sản phẩm</th>
              <th className="p-2">Tồn kho</th>
              <th className="p-2">Giá</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p, i) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.stockQuantity}</td>
                <td className="p-2">{p.price.toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
