// ✅ ProductManager.jsx – cập nhật để ẩn nút thêm/sửa/xoá nếu là viewer
import { useEffect, useState } from "react";
import allProducts from "../components/data/products";
import ProductForm from "./ProductForm";
import useCategories from "../hooks/useCategories";
import useReviewStats from "../hooks/useReviewStats";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const categories = useCategories();
  const avgRatings = useReviewStats();

  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

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
    if (isViewer) return;
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      const updated = products.filter((p) => p.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSave = (product) => {
    if (isViewer) return;
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
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">📦 Quản lý sản phẩm</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            className="border p-2 rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {!isViewer && (
            <button
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              ➕ Thêm sản phẩm
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-sm rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Ảnh</th>
              <th className="p-3 border-b">Tên</th>
              <th className="p-3 border-b">Giá</th>
              <th className="p-3 border-b">Danh mục</th>
              <th className="p-3 border-b">⭐ Trung bình</th>
              <th className="p-3 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                      onClick={() => setPreviewImage(p.images[0])}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price.toLocaleString()} đ</td>
                <td className="p-3">
                  {categories.find((c) => c.id === p.category)?.label || p.category}
                </td>
                <td className="p-3">
                  {avgRatings[p.name] ? `${avgRatings[p.name]} ⭐` : "—"}
                </td>
                <td className="p-3 text-center space-x-2">
                  {!isViewer && (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                    </>
                  )}
                  {isViewer && <span className="text-gray-400 italic">Chỉ xem</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">
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

      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setViewProduct(null)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
            >×</button>
            <h2 className="text-xl font-bold mb-4">👁️ Chi tiết sản phẩm</h2>
            <div className="grid grid-cols-2 gap-4">
              {viewProduct.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="img"
                  className="w-full h-40 object-cover rounded cursor-pointer"
                  onClick={() => setPreviewImage(img)}
                />
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Tên:</strong> {viewProduct.name}</p>
              <p><strong>Giá:</strong> {viewProduct.price.toLocaleString()} đ</p>
              <p><strong>Danh mục:</strong> {categories.find(c => c.id === viewProduct.category)?.label || viewProduct.category}</p>
              <p><strong>Hãng:</strong> {viewProduct.brand}</p>
              <p><strong>Số lượng:</strong> {viewProduct.quantity}</p>
              <p><strong>Trạng thái:</strong> {viewProduct.status === "available" ? "✅ Còn hàng" : "❌ Hết hàng"}</p>
              <p><strong>Đánh giá:</strong> {viewProduct.rating} ⭐</p>
              <p><strong>Bảo hành:</strong> {viewProduct.warranty}</p>
              <p><strong>Mô tả:</strong> {viewProduct.description}</p>
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Large preview" className="max-w-[90%] max-h-[90%] rounded shadow-lg" />
        </div>
      )}
    </div>
  );
}
