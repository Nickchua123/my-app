import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import categoryMap from "../components/data/categories";
import api from "../Config/axiosConfig";
import BannerImg from "../assets/Banner.png";
import Slider from "react-slick";
import useCategories from "../hooks/useCategories";



// Mảng ảnh chương trình khuyến mãi (ví dụ dùng BannerImg)
const promoImages = [
  BannerImg, BannerImg, BannerImg, BannerImg, BannerImg,
];

export default function HomePage() {



  const [bestseller, setBestseller] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);
  const [allBrandProducts, setAllBrandProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();
  const categories = useCategories();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);


  useEffect(() => {
    api.get("/products?size=1000")
      .then(res => {
        const all = res.data.data.result || res.data.data || [];
        console.log("Tất cả sản phẩm lấy được:", all);
        // Random cho hàng mới về
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        setRandomProducts(all.slice(0, 10));
        // Lấy danh sách hãng
        const uniqueBrands = Array.from(new Set(all.map(p => p.brand).filter(Boolean)));
        setBrands(uniqueBrands);
        console.log("Unique brands:", uniqueBrands);
        if (uniqueBrands.length > 0) {
          setSelectedBrand(uniqueBrands[0]);
          const filtered = all.filter(p => p.brand === uniqueBrands[0]);
          setAllBrandProducts(filtered);
          setBrandProducts(filtered.slice(0, 8));

        }
      });
    api.get("/products?sort=sold,desc&size=10").then(res =>
      setBestseller(res.data.data?.result || res.data.data || [])
    );
  }, []);

  // Render ra props brand
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand); // Set up cho selectBrand
    api.get("/products?size=1000")
      .then(res => {
        const all = res.data.data?.result || res.data.data || [];
        const filtered = all.filter(p => p.brand === brand);
        setAllBrandProducts(filtered);
        setBrandProducts(filtered.slice(0, 8));
        console.log(filtered);
      });
  };

  // Slider  cho các slideshow
  const promoSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };
  const randomSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Hero/Banner */}
        <section className="w-full flex justify-center">
          <div className="relative bg-gradient-to-r from-orange-100 via-white to-orange-50 rounded-xl shadow-lg mt-6 mb-10 p-8 flex flex-col md:flex-row items-center justify-between w-full">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-orange-600 mb-4">
                Khám phá công nghệ <span className="text-orange-500">cùng COMPU</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Giảm giá sốc, bảo hành tận nơi, dịch vụ 5★!
              </p>
              <Link
                to="/category/laptop"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg"
              >
                Mua ngay
              </Link>
            </div>
            <img src={BannerImg} className="h-44 md:h-60 mx-auto" alt="Banner Sản phẩm" />
          </div>
        </section>

        <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-start">
          {/* Main content */}
          <div className="flex-1 space-y-12 flex flex-col items-center">
            {/* Danh mục lớn */}
            {/* <section className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">Danh mục nổi bật</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full justify-center">
                {displayedCategories.map(category => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="bg-white border rounded-xl p-2 md:p-3 shadow hover:shadow-md text-center hover:bg-orange-50 transition flex flex-col items-center min-h-[80px]"
                    style={{ minWidth: 0 }}
                  >
                    <div className="text-base md:text-lg font-semibold mb-1 truncate" title={category.label}>{category.label}</div>
                    <div className="text-xs text-gray-500">Xem sản phẩm</div>
                  </Link>
                ))}
              </div>
              {!showAllCategories && categories.length > 4 && (
                <button
                  className="mt-4 px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                  onClick={() => setShowAllCategories(true)}
                >
                  Xem tất cả danh mục
                </button>
              )}
              {showAllCategories && categories.length > 4 && (
                <button
                  className="mt-2 px-5 py-2 rounded-lg bg-gray-200 text-orange-600 font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowAllCategories(false)}
                >
                  Ẩn bớt
                </button>
              )}
            </section> */}





            {/* Sản phẩm bán chạy */}
            <section className="w-full flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-xl font-bold">🔥 Bán chạy nhất</h2>
                <Link to="/category/bestseller" className="text-orange-600 hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <ProductList products={bestseller} horizontal />
            </section>

            {/* Banner quảng cáo nhỏ */}
            <section className="my-6 w-full flex justify-center">
              <Link to="/promotions">
                <img
                  src="/ad-promo.png"
                  alt="Promo Banner"
                  className="rounded-xl shadow-lg mx-auto max-h-40 object-cover"
                />
              </Link>
            </section>

            {/* Hàng mới về - sản phẩm random */}
            <section className="my-12 w-full flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-xl font-bold">🌟 Hàng mới về</h2>
                <span className="text-gray-500 text-sm">Xem tất cả</span>
              </div>
              <div className="max-w-5xl w-full mx-auto">
                <Slider {...randomSettings}>
                  {randomProducts.map(product => (
                    <div key={product.id} className="p-2 flex justify-center">
                      <div className="bg-white rounded-lg shadow flex flex-col items-center py-4 px-2 h-full">
                        <img
                          src={product.images?.[0] || "/no-image.png"}
                          alt={product.name}
                          className="h-28 w-full object-contain mb-2"
                        />
                        <div className="font-semibold text-base text-center mb-1">{product.name}</div>
                        <div className="text-orange-600 font-bold mb-2">{product.price?.toLocaleString()} đ</div>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>

            {/* Sản phẩm theo hãng */}
            <section className="my-12 w-full flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-xl font-bold">🏷️ Sản phẩm theo hãng</h2>
                {allBrandProducts.length > 8 && (
                  <button
                    onClick={() => navigate(`/brand/${selectedBrand}`)}
                    className="text-orange-600 hover:underline font-semibold"
                  >
                    Xem tất cả
                  </button>
                )}
              </div>
              {/* Nút chọn hãng căn trái */}
              <div className="flex gap-3 flex-wrap mb-4 justify-start w-full">
                {brands.map(brand => (
                  <button
                    key={brand}
                    className={`px-4 py-2 rounded-lg border font-semibold ${selectedBrand === brand ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-100"}`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className="w-full">
                {/* Hiện tối đa 8 sản phẩm */}
                <ProductList products={brandProducts} horizontal={false} />
              </div>
            </section>

            {/* Chương trình khuyến mãi - Slideshow ảnh tự động */}
            <section className="my-12 w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">🎉 Chương trình khuyến mãi</h2>
              <div className="max-w-4xl w-full mx-auto">
                <Slider {...promoSettings}>
                  {promoImages.map((src, idx) => (
                    <div key={idx} className="px-2 flex items-center justify-center">
                      <img
                        src={src}
                        alt={`Khuyến mãi ${idx + 1}`}
                        className="rounded-xl shadow object-cover h-24 md:h-32 w-full"
                        style={{ maxWidth: 380, margin: "0 auto" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </section>

            {/* Chính sách & hỗ trợ */}
            <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center w-full">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Miễn phí vận chuyển</h3>
                <p className="text-sm text-gray-600">Cho đơn hàng từ 500K</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Hỗ trợ 24/7</h3>
                <p className="text-sm text-gray-600">Tư vấn và giải đáp mọi lúc</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Đổi trả 7 ngày</h3>
                <p className="text-sm text-gray-600">Không hài lòng? Đổi dễ dàng</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Thanh toán tiện lợi</h3>
                <p className="text-sm text-gray-600">Nhiều hình thức: Momo, COD...</p>
              </div>
            </section>
          </div>

          {/* SIDEBAR nhiều mục, căn giữa */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col items-center">
            <div className="flex flex-col h-fit space-y-6 w-full items-center">
              {/* Khuyến mãi HOT */}
              <div className="w-full">
                <div className="bg-orange-100 border-l-4 border-orange-500 rounded-xl shadow p-5 mb-4">
                  <h3 className="text-xl font-bold mb-2 text-orange-600">🎁 Chương trình khuyến mãi</h3>
                  <ul className="list-disc list-inside space-y-1 text-orange-900 text-sm">
                    <li>
                      <span className="font-semibold">Giảm 10% </span>cho đơn laptop &gt; 15tr
                    </li>
                    <li>
                      <span className="font-semibold">Freeship</span> toàn quốc đến hết 30/6
                    </li>
                    <li>
                      <span className="font-semibold">Tặng chuột không dây</span> cho đơn PC mới
                    </li>
                    <li>
                      <Link to="/promotions" className="text-orange-600 hover:underline font-semibold">
                        Xem tất cả chương trình &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Hỗ trợ khách hàng */}
              <div className="w-full bg-white rounded-xl shadow p-4 mb-2 flex flex-col items-center">
                <h3 className="text-lg font-bold text-orange-500 mb-2">💬 Hỗ trợ khách hàng</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>
                    <Link to="/policy/return" className="hover:text-orange-500">
                      Đổi trả & hoàn tiền
                    </Link>
                  </li>
                  <li>
                    <Link to="/policy/shipping" className="hover:text-orange-500">
                      Chính sách giao hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:text-orange-500">
                      Câu hỏi thường gặp (FAQ)
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Liên hệ nhanh */}
              <div className="w-full bg-white rounded-xl shadow p-4 mb-2 flex flex-col items-center">
                <h3 className="text-lg font-bold text-orange-500 mb-2">📞 Liên hệ nhanh</h3>
                <div className="text-sm w-full">
                  <div>
                    <span className="font-semibold">Hotline:</span>{" "}
                    <a href="tel:0398373833" className="text-blue-600 hover:underline">0398 373 833</a>
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:thephach5@gmail.com" className="text-blue-600 hover:underline">thephach5@gmail.com</a>
                  </div>
                </div>
              </div>
              {/* Đăng ký nhận tin */}
              <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <h3 className="text-lg font-bold text-orange-500 mb-2">📬 Nhận ưu đãi mới</h3>
                <form
                  className="flex flex-col gap-2 w-full"
                  onSubmit={e => { e.preventDefault(); alert("Đăng ký thành công!"); }}
                >
                  <input
                    type="email"
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                    placeholder="Nhập email của bạn"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white rounded-lg px-3 py-2 font-semibold hover:bg-orange-600 transition"
                  >
                    Đăng ký
                  </button>
                </form>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  Nhận bản tin khuyến mãi & cập nhật mới nhất từ shop.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
