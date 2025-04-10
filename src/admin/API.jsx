// src/api.jsx
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1", // ✅ Đổi nếu Spring Boot chạy cổng khác
    headers: {
        "Content-Type": "application/json",
    },
});

export const createProduct = (productData) => api.post("/products", productData);
export const updateProduct = (productData) => api.put("/products", productData);
export const getAllProducts = () => api.get("/products");
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
