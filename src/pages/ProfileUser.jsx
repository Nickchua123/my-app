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
        password: "",
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

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
                password: currentUser.password || "",
            });
            setAvatarPreview(
                currentUser.avatar
                    ? `http://localhost:8080/storage/user-${currentUser.id}/${currentUser.avatar}`
                    : null
            );
        }
    }, [currentUser]);

    if (!currentUser) return null;

    const getAvatarLetter = (name) => name?.charAt(0)?.toUpperCase() || "U";

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let avatarPath = form.avatar;

        if (avatarFile) {
            const data = new FormData();
            data.append("file", avatarFile);
            data.append("folder", `user-${form.id}`);
            try {
                const uploadRes = await api.post("/files", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                avatarPath = uploadRes.data.data?.fileName || avatarPath;
            } catch {
                alert("Lỗi upload ảnh đại diện!");
                setLoading(false);
                return;
            }
        }

        try {
            const res = await api.put(`/users/${currentUser.id}`, {
                ...form,
                avatar: avatarPath,
            });

            alert("Cập nhật thành công!");
            setCurrentUser({ ...res.data.data, avatar: avatarPath });
            localStorage.setItem("currentUser", JSON.stringify(res.data.data));
            navigate("/");
        } catch {
            alert("Lỗi cập nhật thông tin!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-8 bg-white rounded-xl shadow-xl p-8 space-y-6 border-1 border-gray-500">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Thông tin cá nhân</h2>

            {/* Avatar */}
            <div className="flex justify-center">
                <div className="relative">
                    {avatarPreview || currentUser.avatar ? (
                        <img
                            src={avatarPreview || `http://localhost:8080/storage/user-${currentUser.id}/${currentUser.avatar}`}
                            alt="avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                            onClick={() => document.getElementById("avatarInput").click()}
                        />
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white text-6xl font-semibold rounded-full cursor-pointer hover:scale-105 transition-transform duration-200">
                            {getAvatarLetter(currentUser.name)}
                        </div>
                    )}
                    <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Họ tên"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!isEditable}
                    required
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled
                />
                <InputField
                    label="Tuổi"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
                <InputField
                    label="Địa chỉ"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!isEditable}
                />

                {/* Giới tính */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-2">Giới tính</label>
                    <div className="flex items-center gap-4">
                        {["MALE", "FEMALE", "OTHER"].map((g) => (
                            <label key={g} className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={form.gender === g}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    className="cursor-pointer"
                                />
                                {g === "MALE" ? "Nam" : g === "FEMALE" ? "Nữ" : "Khác"}
                            </label>
                        ))}
                    </div>
                </div>

                <input type="hidden" name="password" value={form.password} />

                {isEditable && (
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                )}
            </form>

            <button
                onClick={() => setIsEditable(!isEditable)}
                className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${isEditable
                    ? "bg-gray-400 text-white hover:bg-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
            >
                {isEditable ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
            </button>
        </div>
    );
}

// Component input field tái sử dụng
function InputField({ label, name, type = "text", value, onChange, disabled, required }) {
    return (
        <div>
            <label className="block font-semibold text-gray-600 mb-1">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
        </div>
    );
}
