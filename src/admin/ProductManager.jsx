import { useEffect, useState } from "react";
import allProducts from "../components/data/products";
import ProductForm from "./ProductForm";
import useCategories from "../hooks/useCategories";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const categories = useCategories();

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(allProducts);
      localStorage.setItem("products", JSON.stringify(allProducts));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      const updated = products.filter((p) => p.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSave = (product) => {
    // Validation: tên trùng
    if (
      !product.id &&
      products.some((p) => p.name.toLowerCase() === product.name.toLowerCase())
    ) {
      alert("Tên sản phẩm đã tồn tại.");
      return;
    }

    let updated;
    if (product.id) {
      updated = products.map((p) => (p.id === product.id ? product : p));
    } else {
      const newProduct = { ...product, id: Date.now() };
      updated = [...products, newProduct];
    }

    saveToStorage(updated);
    setShowForm(false);
    setEditData(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📦 Quản lý sản phẩm</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            className="border p-2 rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              setEditData(null);       // Reset form
              setShowForm(true);       // Hiển thị form thêm
            }}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            ➕ Thêm sản phẩm
          </button>
        </div>
      </div>

      <table className="w-full border border-gray-300 bg-white shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Ảnh</th>
            <th className="p-3 border-b">Tên</th>
            <th className="p-3 border-b">Giá</th>
            <th className="p-3 border-b">Danh mục</th>
            <th className="p-3 border-b text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.price.toLocaleString()} đ</td>
              <td className="p-3">
                {categories.find((c) => c.id === p.category)?.label || p.category}
              </td>
              <td className="p-3 text-center">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  onClick={() => {
                    setEditData(p);
                    setShowForm(true);
                  }}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <ProductForm
              mode={editData ? "edit" : "add"}
              initialData={editData}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
