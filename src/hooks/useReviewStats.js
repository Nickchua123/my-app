// useReviewStats.js – Hook tính trung bình số sao theo từng sản phẩm
import { useEffect, useState } from "react";

export default function useReviewStats() {
  const [avgRatings, setAvgRatings] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    if (!stored) return;
    const reviews = JSON.parse(stored);

    const stats = {};
    reviews.forEach((r) => {
      if (!stats[r.productName]) {
        stats[r.productName] = { total: 0, count: 0 };
      }
      stats[r.productName].total += r.rating;
      stats[r.productName].count += 1;
    });

    const result = {};
    for (const name in stats) {
      const { total, count } = stats[name];
      result[name] = (total / count).toFixed(1);
    }

    setAvgRatings(result);
  }, []);

  return avgRatings; // { "Laptop Dell XPS": "4.8", "Chuột Logitech": "3.5" }
}
