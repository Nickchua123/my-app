import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Config/axiosConfig";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Demo option
const cpuOptions = ["i3", "i5", "i7", "Ryzen 3", "Ryzen 5", "Ryzen 7"];
const ramOptions = [4, 8, 16, 32];
const statusOptions = ["Mới", "Cũ", "Like New"];
const storageTypes = ["SSD", "HDD", "NVMe"];
const screenSizes = ["13", "14", "15.6", "16", "17"];
const gpuOptions = ["Intel", "NVIDIA", "AMD", "RTX 3050", "RTX 3060"];
const sortOptions = [
    { label: "Mới nhất", value: "createdAt,desc" },
    { label: "Giá tăng dần", value: "price,asc" },
    { label: "Giá giảm dần", value: "price,desc" },
    { label: "Bán chạy", value: "sold,desc" },
];

export default function BrandProductPage() {
    const { brandName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy page từ query string
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageParam);

    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});

    // Filter tạm thời
    const [filterDraft, setFilterDraft] = useState({
        name: "",
        priceRange: [0, 50000000],
        selectedCpu: "",
        selectedRam: "",
        selectedStatus: "",
        selectedStorageTypes: [],
        selectedScreen: "",
        selectedGpu: "",
        sort: sortOptions[0].value,
    });
    const [filter, setFilter] = useState(filterDraft);

    // Build filter string cho API
    const buildFilter = (currentFilter) => {
        let filters = [];
        if (currentFilter.name) filters.push(`name=*"${currentFilter.name}"`);
        if (currentFilter.priceRange[0] > 0)
            filters.push(`price>=${currentFilter.priceRange[0]}`);
        if (currentFilter.priceRange[1] < 50000000)
            filters.push(`price<=${currentFilter.priceRange[1]}`);
        if (currentFilter.selectedCpu)
            filters.push(`cpu=="${currentFilter.selectedCpu}"`);
        if (currentFilter.selectedRam)
            filters.push(`ram==${currentFilter.selectedRam}`);
        if (currentFilter.selectedStatus)
            filters.push(`status=="${currentFilter.selectedStatus}"`);
        if (currentFilter.selectedScreen)
            filters.push(`screenSize==${currentFilter.selectedScreen}`);
        if (currentFilter.selectedGpu)
            filters.push(`gpu=="${currentFilter.selectedGpu}"`);
        if (currentFilter.selectedStorageTypes.length) {
            filters.push(
                "(" +
                currentFilter.selectedStorageTypes
                    .map((type) => `storageType=="${type}"`)
                    .join(" or ") +
                ")"
            );
        }
        return filters.join(" and ");
    };

    // Fetch API
    useEffect(() => {
        let query = `?page=${page - 1}&size=8`;
        const filterStr = buildFilter(filter);
        if (filterStr) query += `&filter=${encodeURIComponent(filterStr)}`;
        if (filter.sort) query += `&sort=${filter.sort}`;

        api.get(`/products/brand/${brandName}${query}`).then((res) => {
            setProducts(res.data.data?.result || []);
            setMeta(res.data.data?.meta || {});
        });
    }, [brandName, page, filter]);

    // Khi đổi page → update state + query string
    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearchParams({ page: newPage });
    };

    // Hàm reset filter
    const handleReset = () => {
        const resetDraft = {
            name: "",
            priceRange: [0, 50000000],
            selectedCpu: "",
            selectedRam: "",
            selectedStatus: "",
            selectedStorageTypes: [],
            selectedScreen: "",
            selectedGpu: "",
            sort: sortOptions[0].value,
        };
        setFilterDraft(resetDraft);
        setFilter(resetDraft);
        setPage(1);
        setSearchParams({ page: 1 });
    };

    // CSS helper
    const labelStyle = "block font-semibold text-gray-700 mb-1";
    const inputStyle =
        "border px-3 py-2 rounded w-full mb-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none";
    const selectStyle =
        "border px-3 py-2 rounded w-full mb-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR FILTER */}
            <aside className="w-full lg:w-[280px] flex-shrink-0 order-1 lg:order-none">
                <div className="bg-white rounded-xl shadow-lg p-5 sticky top-20 border border-gray-200">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center justify-between">
                        Bộ lọc
                        <button
                            onClick={handleReset}
                            className="text-sm text-blue-600 hover:underline font-medium"
                        >
                            Xóa tất cả
                        </button>
                    </h3>

                    {/* Tên sản phẩm */}
                    <div className="mb-6 border-b pb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tên sản phẩm
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nhập tên sản phẩm..."
                            value={filterDraft.name}
                            onChange={(e) =>
                                setFilterDraft((f) => ({ ...f, name: e.target.value }))
                            }
                        />
                    </div>

                    {/* Giá */}
                    <div className="mb-6 border-b pb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Khoảng giá (VNĐ)
                        </label>
                        <Slider
                            range
                            min={0}
                            max={50000000}
                            step={500000}
                            value={filterDraft.priceRange}
                            onChange={(val) => setFilterDraft((f) => ({ ...f, priceRange: val }))}
                            railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
                            trackStyle={[{ backgroundColor: "#2563eb", height: 6 }]}
                            handleStyle={[
                                { borderColor: "#2563eb", height: 18, width: 18 },
                                { borderColor: "#2563eb", height: 18, width: 18 },
                            ]}
                        />
                        <div className="flex justify-between text-xs font-medium mt-2">
                            <span>{filterDraft.priceRange[0].toLocaleString()} đ</span>
                            <span>{filterDraft.priceRange[1].toLocaleString()} đ</span>
                        </div>
                    </div>

                    {/* CPU */}
                    <div className="mb-6 border-b pb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CPU
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterDraft.selectedCpu}
                            onChange={(e) =>
                                setFilterDraft((f) => ({ ...f, selectedCpu: e.target.value }))
                            }
                        >
                            <option value="">Tất cả</option>
                            {cpuOptions.map((cpu) => (
                                <option key={cpu} value={cpu}>
                                    {cpu}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* RAM */}
                    <div className="mb-6 border-b pb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            RAM
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterDraft.selectedRam}
                            onChange={(e) =>
                                setFilterDraft((f) => ({ ...f, selectedRam: e.target.value }))
                            }
                        >
                            <option value="">Tất cả</option>
                            {ramOptions.map((ram) => (
                                <option key={ram} value={ram}>
                                    {ram} GB
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tình trạng */}
                    <div className="mb-6 border-b pb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tình trạng
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterDraft.selectedStatus}
                            onChange={(e) =>
                                setFilterDraft((f) => ({ ...f, selectedStatus: e.target.value }))
                            }
                        >
                            <option value="">Tất cả</option>
                            {statusOptions.map((st) => (
                                <option key={st} value={st}>
                                    {st}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút */}
                    <div className="space-y-2">
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                            onClick={() => {
                                setFilter({ ...filterDraft });
                                setPage(1);
                                setSearchParams({ page: 1 });
                            }}
                        >
                            Áp dụng
                        </button>
                        <button
                            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                            onClick={handleReset}
                        >
                            Xóa lọc
                        </button>
                    </div>
                </div>
            </aside>


            {/* MAIN CONTENT */}
            <div className="flex-1 order-2">
                <h1 className="text-2xl font-bold mb-6">
                    Sản phẩm hãng{" "}
                    <span className="text-blue-600 capitalize">{brandName}</span>
                </h1>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((p) => (
                        <Link
                            to={`/product/${p.id}`}
                            key={p.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                        >
                            <img
                                src={
                                    p.images?.[0]
                                        ? `http://localhost:8080/storage/Product-${p.id}/${p.images[0]}`
                                        : "https://via.placeholder.com/300x200?text=No+Image"
                                }
                                alt={p.name}
                                className="h-36 object-contain mb-3 mx-auto"
                            />
                            <h3 className="font-semibold text-sm line-clamp-2 text-center">
                                {p.name}
                            </h3>
                            <p className="text-center font-bold text-lg text-gray-800 mt-2">
                                {p.price?.toLocaleString()} đ
                            </p>
                            <p
                                className={`text-sm text-center font-medium ${p.stockQuantity > 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {p.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2">
                    {[...Array(meta.pages || 1).keys()].map((idx) => (
                        <button
                            key={idx}
                            className={`px-4 py-2 rounded-full font-bold border-2 ${idx + 1 === page
                                ? "bg-blue-600 border-blue-600 text-white shadow"
                                : "bg-white border-gray-300 text-blue-600 hover:bg-blue-50"
                                }`}
                            onClick={() => handlePageChange(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
