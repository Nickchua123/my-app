// ReviewManager.jsx - Quản lý đánh giá sản phẩm
import { useEffect, useState } from "react";

export default function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      const dummy = [
        {
          id: 1,
          productName: "Laptop Dell XPS",
          customer: "Nguyễn Văn A",
          rating: 5,
          comment: "Sản phẩm tuyệt vời, hiệu năng mạnh!",
          createdAt: "2024-04-01T10:00:00",
        },
        {
          id: 2,
          productName: "Chuột Logitech",
          customer: "Trần Thị B",
          rating: 3,
          comment: "Tạm ổn, hơi nhỏ tay.",
          createdAt: "2024-04-02T15:00:00",
        },
      ];
      setReviews(dummy);
      localStorage.setItem("reviews", JSON.stringify(dummy));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá đánh giá này?")) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      localStorage.setItem("reviews", JSON.stringify(updated));
    }
  };

  const filtered =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filterRating));

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
              <th className="p-3">Sản phẩm</th>
              <th className="p-3">Khách</th>
              <th className="p-3">Sao</th>
              <th className="p-3">Bình luận</th>
              <th className="p-3">Ngày</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{r.productName}</td>
                <td className="p-3">{r.customer}</td>
                <td className="p-3">{r.rating} ⭐</td>
                <td className="p-3 text-sm">{r.comment}</td>
                <td className="p-3">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Xoá
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
