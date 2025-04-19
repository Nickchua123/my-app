import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // mở form sửa
  const [addingProduct, setAddingProduct] = useState(false); // mở form thêm
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(editingProduct)) return;

    try {
      await axios.put("http://localhost:8080/api/v1/products", editingProduct);
      alert("✅ Cập nhật sản phẩm thành công!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật:", err);
      alert("❌ Không cập nhật được sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      alert("🗑️ Đã xóa sản phẩm thành công !");
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("❌ Không thể xóa sản phẩm");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validate(editingProduct)) return;

    try {
      await axios.post("http://localhost:8080/api/v1/products", editingProduct);
      alert("✅ Thêm sản phẩm thành công!");
      setEditingProduct(null);
      setAddingProduct(false);
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err);
      alert("❌ Không thể thêm sản phẩm");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Danh sách sản phẩm</h2>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => setAddingProduct(true)}
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
                onClick={() => setEditingProduct(p)}
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

      {/* 👉 Popup xem chi tiết */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedProduct(null)}
            >
              ❌
            </button>
            <h3 className="text-lg font-semibold mb-2">👁️ Chi tiết sản phẩm</h3>
            <p><strong>Tên:</strong> {selectedProduct.name}</p>
            <p><strong>Giá:</strong> {selectedProduct.price} VNĐ</p>
            <p><strong>Số lượng:</strong> {selectedProduct.quantity}</p>
            <p><strong>Hãng:</strong> {selectedProduct.brand}</p>
            <p><strong>Bảo hành:</strong> {selectedProduct.warranty}</p>
            <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
          </div>
        </div>
      )}

      {/* 👉 Popup chỉnh sửa */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-2xl relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setEditingProduct(null)}
              type="button"
            >
              ❌
            </button>

            <h3 className="text-xl font-semibold">✏️ Chỉnh sửa sản phẩm</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label>Tên sản phẩm *</label>
                <input
                  type="text"
                  className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label>Giá (VNĐ) *</label>
                <input
                  type="number"
                  className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  className={inputClass}
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, quantity: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Hãng</label>
                <input
                  type="text"
                  className={inputClass}
                  value={editingProduct.brand}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, brand: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Bảo hành</label>
                <input
                  type="text"
                  className={inputClass}
                  value={editingProduct.warranty}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, warranty: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label>Mô tả</label>
              <textarea
                rows={4}
                className={inputClass}
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                💾 Lưu thay đổi
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditingProduct(null)}
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 👉 Popup thêm sản phẩm */}
      {addingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-2xl relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setAddingProduct(false)}
              type="button"
            >
              ❌
            </button>

            <h3 className="text-xl font-semibold">➕ Thêm sản phẩm mới</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label>Tên sản phẩm *</label>
                <input
                  type="text"
                  className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
                  value={editingProduct?.name || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label>Giá (VNĐ) *</label>
                <input
                  type="number"
                  className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
                  value={editingProduct?.price || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div>
                <label>Số lượng</label>
                <input
                  type="number"
                  className={inputClass}
                  value={editingProduct?.quantity || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, quantity: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Hãng</label>
                <input
                  type="text"
                  className={inputClass}
                  value={editingProduct?.brand || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, brand: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Bảo hành</label>
                <input
                  type="text"
                  className={inputClass}
                  value={editingProduct?.warranty || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, warranty: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label>Mô tả</label>
              <textarea
                rows={4}
                className={inputClass}
                value={editingProduct?.description || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                💾 Thêm sản phẩm
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setAddingProduct(false)}
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
