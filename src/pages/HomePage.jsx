import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import categoryMap from "../components/data/categories";
import api from "../Config/axiosConfig";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    api.get(`/products?page=${page}&size=${pageSize}`) //  đúng template string
      .then((res) => {
        const data = res.data.data;
        setProducts(data.result || []);
        setTotalPages(data.meta.pages || 1);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [page]);

  return (
    <div className="p-6 space-y-12">
      {/* Banner */}
      <div className="bg-orange-100 p-6 rounded-xl text-center shadow-lg">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Chào mừng đến với COMPU</h1>
        <p className="text-lg md:text-xl mb-6">Nơi mua sắm sản phẩm chất lượng với giá tốt nhất!</p>
        <Link
          to="/category/fashion"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Mua ngay
        </Link>
      </div>

      {/* Danh mục sản phẩm */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Danh mục nổi bật</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(categoryMap).map(([slug, name]) => (
            <Link
              key={slug}
              to={`/category/${slug}`}
              className="bg-white border p-4 rounded-lg shadow hover:shadow-md text-center hover:bg-orange-50 transition"
            >
              <div className="text-xl font-semibold mb-2">{name}</div>
              <div className="text-sm text-gray-500">Xem sản phẩm</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Sản phẩm nổi bật</h2>
        <ProductList products={products} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      {/* Chính sách & hỗ trợ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Miễn phí vận chuyển</h3>
          <p className="text-sm text-gray-600">Cho đơn hàng từ 500K</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Hỗ trợ 24/7</h3>
          <p className="text-sm text-gray-600">Tư vấn và giải đáp mọi lúc</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Đổi trả 7 ngày</h3>
          <p className="text-sm text-gray-600">Không hài lòng? Đổi dễ dàng</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Thanh toán tiện lợi</h3>
          <p className="text-sm text-gray-600">Nhiều hình thức: Momo, COD...</p>
        </div>
      </section>
    </div>
  );
}
