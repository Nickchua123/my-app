// src/hooks/useCategories.js
import { useEffect, useState } from "react";
import axios from "axios";
//  Lấy dữ liệu từ BE 
export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/categories")
      .then((res) => {
        console.log("✅ Danh mục từ BE:", res.data); // log kết quả

        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh mục:", err);
      });
  }, []);

  return categories;
}
