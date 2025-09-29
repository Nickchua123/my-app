import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Save, X, FolderTree } from "lucide-react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [errors, setErrors] = useState({});
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh mục:", err);
    }
  };

  const handleAdd = async () => {
    const newErrors = {};
    if (!newId.trim()) newErrors.id = "Vui lòng nhập ID danh mục.";
    if (!newLabel.trim()) newErrors.label = "Vui lòng nhập tên danh mục.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post("http://localhost:8080/api/v1/categories", {
        id: newId.trim(),
        label: newLabel.trim(),
      });
      setNewId("");
      setNewLabel("");
      fetchCategories();
    } catch (err) {
      console.error("❌ Lỗi khi thêm danh mục:", err);
      alert("Lỗi khi thêm danh mục!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/categories/${id}`);
      fetchCategories();
      alert("Xoá danh mục thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi xoá danh mục:", err);
      alert("Không thể xoá danh mục vì còn sản phẩm!");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!editData.label.trim()) newErrors.label = "Vui lòng nhập tên danh mục.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.put(
        `http://localhost:8080/api/v1/categories/${editData.id}`,
        { id: editData.id, label: editData.label.trim() }
      );
      setEditData(null);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật:", err);
      alert("Lỗi khi cập nhật danh mục!");
    }
  };

  const inputClass = "border p-2 rounded w-full focus:ring focus:ring-blue-300";

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FolderTree className="w-6 h-6 text-orange-500" />
        Quản lý danh mục
      </h1>

      {/* Form thêm danh mục */}
      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/3">
            <input
              type="text"
              placeholder="ID (ví dụ: laptop)"
              className={`${inputClass} ${errors.id ? "border-red-500" : ""}`}
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
          </div>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Tên danh mục (ví dụ: Laptop)"
              className={`${inputClass} ${errors.label ? "border-red-500" : ""}`}
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
            {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tên danh mục</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{cat.id}</td>
                <td className="p-3">{cat.label}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditData({ ...cat });
                      setErrors({});
                      setShowForm(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal sửa */}
      {showForm && editData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close */}
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
                setErrors({});
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-500" />
              Sửa danh mục
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">ID (không sửa)</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
                  value={editData.id}
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Tên danh mục</label>
                <input
                  type="text"
                  className={`${inputClass} ${errors.label ? "border-red-500" : ""}`}
                  value={editData.label}
                  onChange={(e) =>
                    setEditData({ ...editData, label: e.target.value })
                  }
                />
                {errors.label && (
                  <p className="text-red-500 text-sm mt-1">{errors.label}</p>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
              >
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
