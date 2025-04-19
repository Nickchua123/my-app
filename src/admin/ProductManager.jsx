import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false); // State để hiển thị form thêm sản phẩm
  const [editData, setEditData] = useState(null); // State để lưu dữ liệu sản phẩm khi chỉnh sửa

  const inputClass = "w-full border p-2 rounded";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/products");
      setProducts(res.data.data.result);
    } catch (err) {
      console.error("❌ Lỗi khi load sản phẩm:", err);
    }
  };

  // Hàm validate
  const validate = (product) => {
    const newErrors = {};
    if (!product.name?.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!product.price || Number(product.price) <= 0) newErrors.price = "Giá phải lớn hơn 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm lưu sản phẩm
  const handleSave = async (data) => {
    try {
      if (editData) {
        // Cập nhật sản phẩm
        await axios.put(`http://localhost:8080/api/v1/products/${editData.id}`, data);
        alert("✅ Cập nhật sản phẩm thành công!");
      } else {
        // Thêm sản phẩm mới
        await axios.post("http://localhost:8080/api/v1/products", data);
        alert("✅ Thêm sản phẩm thành công!");
      }

      fetchProducts(); // Tải lại danh sách sản phẩm
      setShowForm(false); // Đóng form
      setEditData(null); // Reset dữ liệu chỉnh sửa
    } catch (err) {
      console.error("❌ Lỗi khi lưu sản phẩm:", err);
      alert("❌ Không thể lưu sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      alert("🗑️ Đã xóa sản phẩm thành công!");
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm:", err);
      alert("❌ Không thể xóa sản phẩm");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Danh sách sản phẩm</h2>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => {
          setShowForm(true); // Hiển thị form khi thêm sản phẩm mới
          setEditData(null); // Không có dữ liệu để chỉnh sửa, tạo mới
        }}
      >
        ➕ Thêm sản phẩm mới
      </button>

      <ul className="space-y-2 mb-6">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => setSelectedProduct(p)}>
              <strong>{p.name}</strong> – {p.price} VNĐ
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  setEditingProduct(p);
                  setShowForm(true); // Hiển thị form khi chỉnh sửa
                }}
              >
                ✏️ Sửa
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(p.id)}
              >
                🗑️ Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 👉 Popup chỉnh sửa hoặc thêm sản phẩm */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowForm(false); // Đóng form khi nhấn ×
                setEditData(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <ProductForm
              mode={editData ? "edit" : "add"}
              initialData={editData}
              onSave={handleSave} // Gửi hàm lưu sản phẩm vào form
            />
          </div>
        </div>
      )}
    </div>
  );
}
