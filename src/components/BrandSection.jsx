import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BrandSection({
    logo,
    title,
    brandSlug,
    products,
    getImageUrl,
    brand,        // ví dụ: "laptop" | "desktop" | "monitor"
    seriesList = [], // ví dụ: ["GS","GT","GE"]
}) {
    const [activeSeries, setActiveSeries] = useState(seriesList[0] || null);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (activeSeries) {
            setFiltered(
                products
                    .filter(
                        (p) =>
                            // p.series?.toLowerCase() === activeSeries.toLowerCase() &&
                            p.brand?.toLowerCase() === brand.toLowerCase()
                    )
                    .slice(0, 5)
            );
        } else {
            setFiltered(
                products
                    .filter((p) => p.brand?.toLowerCase() === brand.toLowerCase())
                    .slice(0, 5)
            );
        }
    }, [products, activeSeries, brand]);

    return (
        <div className="mb-16">
            {/* Tabs Series */}
            {seriesList.length > 0 && (
                <div className="flex gap-6 border-b mb-6">
                    {seriesList.map((s) => (
                        <button
                            key={s}
                            onClick={() => setActiveSeries(s)}
                            className={`px-6 py-2 font-semibold uppercase transition ${activeSeries === s
                                ? "border-b-2 border-red-600 text-red-600"
                                : "text-gray-600 hover:text-black"
                                }`}
                        >
                            {s} Series
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                {/* Banner bên trái */}
                <div className="col-span-1 relative rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={logo}
                        alt={title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                        {/* <h3 className="font-bold text-lg uppercase text-white mb-3">
                            {title}
                        </h3> */}
                        <Link
                            to={`/brand/${brandSlug}`}
                            className=" max-h-full text-white px-4 py-2 rounded-md font-medium"
                        >
                            {/* View All → */}
                        </Link>
                    </div>
                </div>

                {/* Sản phẩm */}
                <div className="col-span-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 flex flex-col"
                            >
                                <img
                                    src={getImageUrl(p)}
                                    alt={p.name}
                                    className="h-52 object-contain mb-4"
                                />
                                <h3 className="font-medium text-sm line-clamp-2 text-center">
                                    {p.name}
                                </h3>
                                <p className="text-orange-600 font-bold mt-2 text-center">
                                    {p.price?.toLocaleString()} đ
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-5 text-gray-500 text-center">
                            Không có sản phẩm
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
