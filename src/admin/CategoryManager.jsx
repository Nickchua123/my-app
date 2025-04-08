// src/admin/CategoryManager.jsx
import { useEffect, useState } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");

  // Load từ localStorage (hoặc tạo mặc định)
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      const defaultCats = [
        { id: "fashion", label: "Thời trang" },
        { id: "electronics", label: "Điện tử" },
        { id: "tools", label: "Công cụ" },
        { id: "furniture", label: "Nội thất" },
      ];
      setCategories(defaultCats);
      localStorage.setItem("categories", JSON.stringify(defaultCats));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  };

  const handleAdd = () => {
    if (!newId || !newLabel) return alert("Vui lòng nhập đầy đủ thông tin.");
    if (categories.find((c) => c.id === newId)) return alert("ID đã tồn tại.");
    const newList = [...categories, { id: newId, label: newLabel }];
    saveToStorage(newList);
    setNewId("");
    setNewLabel("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
      const newList = categories.filter((c) => c.id !== id);
      saveToStorage(newList);
    }
  };

  const handleEdit = (id) => {
    const label = prompt("Nhập tên mới:");
    if (label) {
      const newList = categories.map((c) =>
        c.id === id ? { ...c, label } : c
      );
      saveToStorage(newList);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗂️ Quản lý danh mục</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="ID (ví dụ: laptop)"
          className="border p-2 rounded w-1/3"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tên danh mục (ví dụ: Laptop)"
          className="border p-2 rounded w-1/2"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          ➕ Thêm
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Tên danh mục</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t">
              <td className="p-3">{cat.id}</td>
              <td className="p-3">{cat.label}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(cat.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
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
  );
}
