import React, { useEffect, useState } from "react";


const ProductForm = ({ selectedProduct = null, onSaveSuccess }) => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product.id) {
                await axios.put("http://localhost:8080/api/v1/products", product);
            } else {
                await axios.post("http://localhost:8080/api/v1/products", product);
            }
            alert("✅ Gửi dữ liệu thành công!");
            onSaveSuccess && onSaveSuccess(); // gọi callback nếu có
        } catch (err) {
            console.error("❌ Lỗi khi gửi dữ liệu:", err);
            alert("❌ Không gửi được dữ liệu");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
            <h2>{product.id ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}</h2>

            <div>
                <label>Tên sản phẩm:</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Mô tả:</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Giá:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Số lượng kho:</label>
                <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                style={{ padding: "15px 30px", fontSize: "16px", marginTop: "16px" }}
            >
                {product.id ? "💾 Cập nhật" : "✅ Thêm mới"}
            </button>
        </form>
    );
};

export default ProductForm;
