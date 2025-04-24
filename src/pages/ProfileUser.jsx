import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import api from "../Config/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        address: "",
        avatar: "",
        gender: "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false); // Trạng thái chỉnh sửa

    useEffect(() => {
        if (currentUser) {
            setForm({
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                age: currentUser.age,
                address: currentUser.address,
                avatar: currentUser.avatar,
                gender: currentUser.gender,
                password: currentUser.password || "", // Đảm bảo password cũng được lấy nếu cần
            });
            // Cập nhật ảnh avatar vào preview nếu có
            setAvatarPreview(currentUser.avatar ? `http://localhost:8080/storage/user-${currentUser.id}/${currentUser.avatar}` : "Không set đc avatar");
        }

    }, [currentUser]);

    if (!currentUser) {
        console.log("Current k có ", currentUser);
        return null;
    }

    const getAvatarLetter = (name) => name?.charAt(0)?.toUpperCase() || "U";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file)); // Preview ảnh trước khi upload
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let avatarPath = form.avatar;

        // 1. Upload avatar lên server nếu có chọn file mới
        if (avatarFile) {
            const data = new FormData();
            data.append("file", avatarFile);
            data.append("folder", `user-${form.id}`);
            try {
                const uploadRes = await api.post("/files", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                avatarPath = uploadRes.data.data?.fileName || avatarPath;
            } catch (err) {
                alert("Lỗi upload ảnh đại diện!");
                setLoading(false);
                return;
            }
        }

        // 2. Gửi request update user (cập nhật avatar)
        try {
            const res = await api.put(`/users/${currentUser.id}`, {
                ...form,
                avatar: avatarPath, // Đảm bảo trường avatar được cập nhật
            });
            console.log("Đang chỉnh sửa id :", currentUser.id);
            alert("Cập nhật thành công nhé!");

            // Cập nhật lại thông tin người dùng trong context và lưu vào localStorage
            if (typeof setCurrentUser === "function") {
                setCurrentUser({ ...res.data.data, avatar: avatarPath });
                localStorage.setItem("currentUser", JSON.stringify(res.data.data)); // Lưu vào localStorage
            }

            navigate("/"); // Điều hướng về trang chủ sau khi cập nhật thành công
        } catch (err) {
            alert("Lỗi cập nhật thông tin sai !");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Hàm bật/tắt chỉnh sửa
    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div className="max-w-3xl mx-auto my-8 bg-white rounded-xl shadow-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Thông tin cá nhân</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center">
                    <div className="relative">
                        {currentUser.avatar || avatarPreview ? (
                            <img
                                src={avatarPreview || form.avatar || currentUser.avatar}
                                alt="avatar"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 hover:opacity-90"
                                onClick={() => document.getElementById("avatarInput").click()} // Khi nhấn vào ảnh sẽ mở hộp thoại chọn ảnh
                            />
                        ) : (
                            <span className="w-32 h-32 flex items-center justify-center bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white text-6xl font-semibold rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                                {getAvatarLetter(currentUser.name)} {/* Hiển thị chữ cái đầu tiên */}
                            </span>
                        )}
                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-32 h-32"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold text-gray-600">Họ tên</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={!isEditable}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-600">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-600">Tuổi</label>
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="number"
                        disabled={!isEditable}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-600">Địa chỉ</label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={!isEditable}
                    />
                </div>

                {/* Giới tính */}
                <div>
                    <label className="block font-semibold text-gray-600">Giới tính</label>
                    <div className="flex items-center space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                onChange={handleChange}
                                checked={form.gender === "MALE"}
                                disabled={!isEditable}
                                className="mr-2"
                            />
                            Nam
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                onChange={handleChange}
                                checked={form.gender === "FEMALE"}
                                disabled={!isEditable}
                                className="mr-2"
                            />
                            Nữ
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="OTHER"
                                onChange={handleChange}
                                checked={form.gender === "OTHER"}
                                disabled={!isEditable}
                                className="mr-2"
                            />
                            Khác
                        </label>
                    </div>
                </div>

                <input type="hidden" name="password" value={form.password} />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                >
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
            </form>

            <button
                type="button"
                onClick={() => setIsEditable(!isEditable)}
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                {isEditable ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
            </button>
        </div>
    );
}
