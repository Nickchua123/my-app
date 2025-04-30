import React, { useState } from "react";

export default function CheckoutForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: "",
    });

    const [errors, setErrors] = useState({});

    // Validate cơ bản
    const validate = () => {
        let err = {};
        if (!form.name.trim()) err.name = "Vui lòng nhập tên";
        if (!form.phone.trim()) err.phone = "Vui lòng nhập số điện thoại";
        if (!form.email.trim()) err.email = "Vui lòng nhập email";
        if (!form.address.trim()) err.address = "Vui lòng nhập địa chỉ";
        return err;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length === 0) {
            onSubmit(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-5 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-3 text-orange-600">Thông tin giao hàng</h2>
            <div>
                <label className="block font-medium mb-1">Họ và tên</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
                <label className="block font-medium mb-1">Số điện thoại</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>
            <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div>
                <label className="block font-medium mb-1">Địa chỉ nhận hàng</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
            </div>
            <div>
                <label className="block font-medium mb-1">Ghi chú (không bắt buộc)</label>
                <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    rows={2}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold rounded px-4 py-2 mt-3 hover:bg-orange-600 transition"
            >
                Tiếp tục
            </button>
        </form>
    );
}
