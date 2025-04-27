import axios from "axios";

// Tạo Token
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1", // URL BE
    withCredentials: true, // Để gửi và nhận cookie refreshToken
});

// Gắn accessToken vào header mỗi request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(" Gửi token:", token);
    } else {
        console.warn(" Không tìm thấy token");
    }
    return config;
});

// Nếu bị 401 → gọi /auth/refresh → retry lại request
api.interceptors.response.use(undefined, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const res = await axios.get("http://localhost:8080/api/v1/auth/refresh", {
                withCredentials: true,
            });
            const newToken = res.data.accessToken;
            localStorage.setItem("accessToken", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (err) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login"; // Chuyển về login nếu refresh cũng fail
        }
    }

    return Promise.reject(error);
});

export default api;
