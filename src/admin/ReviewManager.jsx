import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Config/axiosConfig";

export default function ReviewManager() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/reviews?page=0&size=20`);
      console.log(res.data.data.content);
      setReviews(res.data.data.content);
    } catch (err) {
      console.error(err);
      setError("Lỗi tải đánh giá.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) return;
    try {
      await api.delete(`/products/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      alert("✅ Đã xóa đánh giá thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Xóa đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  const filtered =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filterRating));

  if (loading) return <div className="p-6">Đang tải đánh giá...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⭐ Quản lý đánh giá sản phẩm</h1>

      <div className="flex justify-between items-center mb-4">
        <span>Tổng: {filtered.length} đánh giá</span>
        <select
          className="border p-2 rounded"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
        >
          <option value="all">Tất cả sao</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{star} sao</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Khách</th>
              <th className="p-3">Sao</th>
              <th className="p-3">Bình luận</th>
              <th className="p-3">Ngày</th>
              <th className="p-3 text-center">Hành động</th> {/* ✅ Thêm cột Hành động */}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{r.user?.name || "Ẩn danh"}</td>
                <td className="p-3">{r.rating} ⭐</td>
                <td className="p-3 text-sm">{r.review}</td>
                <td className="p-3">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
