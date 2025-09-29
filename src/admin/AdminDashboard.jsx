import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import axios from "axios";

// Recharts
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
  LabelList,
} from "recharts";

// Lucide icons
import {
  BarChart3,
  Package,
  DollarSign,
  PieChart as PieIcon,
  TrendingUp,
} from "lucide-react";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#8884D8", "#FF6666"];

export default function AdminDashboard() {
  const categories = useCategories();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products?size=250")
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

  const pieData = categories
    .map(({ id, label }) => {
      const count = products.filter((p) => p.category?.id === id).length;
      return { name: label, value: count };
    })
    .filter((d) => d.value > 0);

  const topRevenueProducts = [...products]
    .map((p) => ({
      name: p.name,
      revenue: (p.price || 0) * (p.stockQuantity || 0),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Format số tiền
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value) + " ₫";
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="w-7 h-7 text-blue-600" />
        Bảng thống kê
      </h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Tổng sản phẩm */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold flex items-center justify-center gap-2 mb-2">
            <Package className="w-5 h-5 text-gray-600" />
            Tổng số sản phẩm
          </h2>
          <p className="text-2xl font-bold text-blue-500">
            {totalProducts} sản phẩm
          </p>
        </div>

        {/* Tổng giá trị tồn kho */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-gray-600" />
            Tổng giá trị tồn kho
          </h2>
          <p className="text-2xl font-bold text-blue-500">
            {totalValue.toLocaleString("vi-VN")} ₫
          </p>
        </div>

        {/* Phân loại danh mục */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
            <PieIcon className="w-5 h-5 text-gray-600" />
            Phân loại theo danh mục
          </h2>
          <ul className="space-y-1">
            {categories.map(({ id, label }) => {
              const count = products.filter((p) => p.category?.id === id).length;
              if (count === 0) return null;
              return (
                <li key={id} className="flex justify-between">
                  <span>{label}</span>
                  <strong>{count}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-gray-600" />
            Biểu đồ sản phẩm theo danh mục
          </h2>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v} sản phẩm`} />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            Top 5 sản phẩm có doanh thu cao nhất
          </h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={topRevenueProducts}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <XAxis
                dataKey="name"
                interval={0}
                angle={-20}
                dy={20}
                tick={{ fontSize: 12 }}
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(v) => v.toLocaleString("vi-VN") + " ₫"} />
              <Legend verticalAlign="top" align="right" height={36} />

              <Bar dataKey="revenue" fill="#ff7300" name="Doanh thu">
                {/* <LabelList
                  dataKey="revenue"
                  position="top"
                  formatter={(v) =>
                    new Intl.NumberFormat("vi-VN", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(v) + " ₫"
                  }
                /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
