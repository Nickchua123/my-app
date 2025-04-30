import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Config/axiosConfig";
import ProductList from "../components/ProductList";
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
    { label: "Bán chạy", value: "sold,desc" }
];

export default function BrandProductPage() {
    const { brandName } = useParams();
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(0);

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

    function buildFilter(currentFilter) {
        let filters = [];
        if (currentFilter.name) filters.push(`name=*"${currentFilter.name}"`);
        if (currentFilter.priceRange[0] > 0) filters.push(`price>=${currentFilter.priceRange[0]}`);
        if (currentFilter.priceRange[1] < 50000000) filters.push(`price<=${currentFilter.priceRange[1]}`);
        if (currentFilter.selectedCpu) filters.push(`cpu=="${currentFilter.selectedCpu}"`);
        if (currentFilter.selectedRam) filters.push(`ram==${currentFilter.selectedRam}`);
        if (currentFilter.selectedStatus) filters.push(`status=="${currentFilter.selectedStatus}"`);
        if (currentFilter.selectedScreen) filters.push(`screenSize==${currentFilter.selectedScreen}`);
        if (currentFilter.selectedGpu) filters.push(`gpu=="${currentFilter.selectedGpu}"`);
        if (currentFilter.selectedStorageTypes.length) {
            filters.push(
                "(" +
                currentFilter.selectedStorageTypes.map(type => `storageType=="${type}"`).join(" or ") +
                ")"
            );
        }
        return filters.join(" and ");
    }

    useEffect(() => {
        let query = `?page=${page}&size=8`;
        const filterStr = buildFilter(filter); // 💥 Pass đúng filter vào đây
        if (filterStr) query += `&filter=${encodeURIComponent(filterStr)}`;
        if (filter.sort) query += `&sort=${filter.sort}`;

        api.get(`/products/brand/${brandName}${query}`).then(res => {
            setProducts(res.data.data?.result || []);
            setMeta(res.data.data?.meta || {});
        });
    }, [brandName, page, filter]);

    // Nút tìm kiếm
    const handleSearch = () => {
        setFilter({ ...filterDraft });
        setPage(0);
    };

    // Reset filter
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
        setPage(0);
    };

    // Helper CSS
    const labelStyle = "block font-semibold text-gray-700 mb-1";
    const inputStyle = "border px-3 py-2 rounded w-full mb-3 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none";
    const selectStyle = "border px-3 py-2 rounded w-full mb-3 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none";


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR FILTER TRÁI */}
            <aside className="w-full lg:w-[300px] flex-shrink-0 order-1 lg:order-none">
                <div className="bg-white rounded-2xl shadow-xl p-7 sticky top-20 space-y-6 border border-orange-100">
                    <h3 className="text-2xl font-extrabold mb-4 text-orange-600 tracking-tight">Lọc nâng cao</h3>

                    <div>
                        <label className={labelStyle}>Tên sản phẩm:</label>
                        <input
                            className={inputStyle}
                            placeholder="Nhập tên sản phẩm"
                            value={filterDraft.name}
                            onChange={e => setFilterDraft(f => ({ ...f, name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Khoảng giá (VNĐ):</label>
                        <div className="flex flex-col items-center mb-3">
                            <Slider
                                range
                                min={0}
                                max={50000000}
                                step={500000}
                                value={filterDraft.priceRange}
                                onChange={val => setFilterDraft(f => ({ ...f, priceRange: val }))}
                                railStyle={{ backgroundColor: "#fee2b3", height: 6 }}
                                handleStyle={[
                                    { borderColor: "#f97316", height: 24, width: 24 },
                                    { borderColor: "#f97316", height: 24, width: 24 },
                                ]}
                                trackStyle={[{ backgroundColor: "#f97316", height: 8 }]}
                            />
                            <div className="flex justify-between w-full text-xs mt-1 px-1 font-medium">
                                <span>{filterDraft.priceRange[0].toLocaleString()} đ</span>
                                <span>{filterDraft.priceRange[1].toLocaleString()} đ</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className={labelStyle}>CPU:</label>
                        <select
                            className={selectStyle}
                            value={filterDraft.selectedCpu}
                            onChange={e => setFilterDraft(f => ({ ...f, selectedCpu: e.target.value }))}
                        >
                            <option value="">Tất cả</option>
                            {cpuOptions.map(cpu => <option key={cpu} value={cpu}>{cpu}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>RAM (GB):</label>
                        <select
                            className={selectStyle}
                            value={filterDraft.selectedRam}
                            onChange={e => setFilterDraft(f => ({ ...f, selectedRam: e.target.value }))}
                        >
                            <option value="">Tất cả</option>
                            {ramOptions.map(ram => <option key={ram} value={ram}>{ram} GB</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>Ổ cứng:</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {storageTypes.map(type => (
                                <label key={type} className="inline-flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        className="mr-1 accent-orange-500"
                                        value={type}
                                        checked={filterDraft.selectedStorageTypes.includes(type)}
                                        onChange={e => {
                                            setFilterDraft(f => ({
                                                ...f,
                                                selectedStorageTypes: e.target.checked
                                                    ? [...f.selectedStorageTypes, type]
                                                    : f.selectedStorageTypes.filter(x => x !== type)
                                            }));
                                        }}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className={labelStyle}>Màn hình (inch):</label>
                        <select
                            className={selectStyle}
                            value={filterDraft.selectedScreen}
                            onChange={e => setFilterDraft(f => ({ ...f, selectedScreen: e.target.value }))}
                        >
                            <option value="">Tất cả</option>
                            {screenSizes.map(size => <option key={size} value={size}>{size}"</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>Card đồ họa:</label>
                        <select
                            className={selectStyle}
                            value={filterDraft.selectedGpu}
                            onChange={e => setFilterDraft(f => ({ ...f, selectedGpu: e.target.value }))}
                        >
                            <option value="">Tất cả</option>
                            {gpuOptions.map(gpu => <option key={gpu} value={gpu}>{gpu}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>Tình trạng:</label>
                        <select
                            className={selectStyle.replace("mb-3", "")}
                            value={filterDraft.selectedStatus}
                            onChange={e => setFilterDraft(f => ({ ...f, selectedStatus: e.target.value }))}
                        >
                            <option value="">Tất cả</option>
                            {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>Sắp xếp:</label>
                        <select
                            className={selectStyle.replace("mb-3", "")}
                            value={filterDraft.sort}
                            onChange={e => setFilterDraft(f => ({ ...f, sort: e.target.value }))}
                        >
                            {sortOptions.map(op => (
                                <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Button tìm kiếm và reset */}
                    <button
                        className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold mt-3 mb-1 hover:bg-orange-600 transition duration-200 shadow-lg"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </button>
                    <button
                        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                        onClick={handleReset}
                    >
                        Xóa lọc
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 order-2">
                <h1 className="text-3xl font-extrabold mb-6">Sản phẩm hãng <span className="text-orange-600">{brandName}</span></h1>
                <ProductList products={products} />
                <div className="mt-4 flex gap-2 flex-wrap">
                    {/* Nút phân trang */}
                    {[...Array(meta.pages || 1).keys()].map(idx => (
                        <button
                            key={idx}
                            className={`px-4 py-2 rounded-full font-bold border-2 ${idx === page ? "bg-orange-500 border-orange-500 text-white shadow" : "bg-white border-gray-300 text-orange-700 hover:bg-orange-50"}`}
                            onClick={() => setPage(idx)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
