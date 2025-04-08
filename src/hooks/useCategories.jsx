// src/hooks/useCategories.js
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  return categories;
}
