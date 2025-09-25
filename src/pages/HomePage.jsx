import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import api from "../Config/axiosConfig";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Banner ảnh
import BannerImg from "../assets/Banner.png";
import BannerImg2 from "../assets/Banner2.png";
import BannerImg3 from "../assets/Banner3.png";

// Logo hãng
import LogoMSI from "../assets/LogoMSI.png";
import LogoDesktops from "../assets/LogoDesktops.png";
import LogoGaming from "../assets/LogoGaming.png";

// Component tái sử dụng
import BrandSection from "../components/BrandSection";

// Logo đối tác
import LogoMSI1 from "../assets/msi.png";
import LogoRazer from "../assets/razer.png";
import LogoThermaltake from "../assets/thermaltake.png";
import LogoAdata from "../assets/adata.png";
import LogoHP from "../assets/hp.png";
import LogoGigabyte from "../assets/gigabyte.png";
import LogoRoccat from "../assets/roccat.png";

const promoImages = [BannerImg, BannerImg2, BannerImg3];

// Nút custom cho slider
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaChevronRight className="text-gray-700" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={onClick}
  >
    <FaChevronLeft className="text-gray-700" />
  </button>
);

export default function HomePage() {
  const [sanPhamMoi, setSanPhamMoi] = useState([]);
  const [buildPC, setBuildPC] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products?sort=createdAt,desc&size=8").then((res) =>
      setSanPhamMoi(res.data.data?.result || res.data.data || [])
    );

    api.get("/products?size=1000").then((res) => {
      const all = res.data.data?.result || res.data.data || [];
      setProducts(all);
      setBuildPC(all.filter((p) => p.category === "build").slice(0, 5));
    });
  }, []);

  const getImageUrl = (product) => {
    const img = product.images?.[0];
    return img
      ? `http://localhost:8080/storage/Product-${product.id}/${img}`
      : "https://via.placeholder.com/300x200?text=No+Image";
  };

  const bannerSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Banner */}
        <section className="mb-12">
          <Slider {...bannerSettings}>
            {promoImages.map((src, i) => (
              <div key={i}>
                <img
                  src={src}
                  alt={`Promo ${i + 1}`}
                  className="w-full h-[480px] object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </Slider>
        </section>

        {/* New Products */}
        <section className="mb-16 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              Sản phẩm mới
            </h2>
            <Link
              to="/category/new"
              className="text-blue-600 hover:underline font-medium"
            >
              Xem tất cả →
            </Link>
          </div>

          <Slider {...settings}>
            {sanPhamMoi.map((p) => (
              <div key={p.id} className="p-2">
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 flex flex-col">
                  <img
                    src={getImageUrl(p)}
                    alt={p.name}
                    className="h-36 object-contain mb-3 mx-auto"
                  />
                  <h3 className="font-medium text-sm line-clamp-2 text-center">
                    {p.name}
                  </h3>
                  <div className="flex justify-center items-center text-yellow-400 text-sm mb-1">
                    {"★".repeat(5)}
                    <span className="text-gray-500 text-xs ml-1">
                      (4 reviews)
                    </span>
                  </div>
                  <p className="text-black font-bold mt-1 text-center">
                    {p.price?.toLocaleString()} đ
                  </p>
                  {p.stockQuantity > 0 ? (
                    <p className="text-green-600 text-sm font-medium text-center mt-1">
                      Còn hàng
                    </p>
                  ) : (
                    <p className="text-red-600 text-sm font-medium text-center mt-1">
                      Hết hàng
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Custom Builds */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="col-span-1 bg-black rounded-lg flex flex-col items-center justify-center p-6">
            <img
              src={LogoDesktops}
              alt="Custom Builds"
              className="mb-4 h-20 object-contain"
            />
            <h3 className="text-white text-xl font-bold mb-2">Custom Builds</h3>
            <Link to="/category/build" className="text-blue-400 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="col-span-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {buildPC.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 flex flex-col"
              >
                <img
                  src={getImageUrl(p)}
                  alt={p.name}
                  className="h-40 object-contain mb-3"
                />
                <h3 className="font-semibold text-sm line-clamp-2 text-center">
                  {p.name}
                </h3>
                <p className="text-black font-bold mt-2 text-center">
                  {p.price?.toLocaleString()} đ
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Sections */}
        <BrandSection
          logo={LogoMSI}
          title="MSI Laptops"
          brandSlug="laptop"
          brand="laptop"
          products={products}
          getImageUrl={getImageUrl}
          seriesList={["GS", "GT", "GE"]}
        />

        <BrandSection
          logo={LogoDesktops}
          title="MSI Desktops"
          brandSlug="desktop"
          brand="desktop"
          products={products}
          getImageUrl={getImageUrl}
        />

        <BrandSection
          logo={LogoGaming}
          title="Gaming Monitors"
          brandSlug="monitor"
          brand="monitor"
          products={products}
          getImageUrl={getImageUrl}
        />
      </div>

      {/* Partner Logos */}
      <div className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-12 overflow-x-auto scrollbar-hide">
          {[LogoMSI1, LogoRazer, LogoThermaltake, LogoAdata, LogoHP, LogoGigabyte, LogoRoccat].map(
            (src, i) => (
              <img
                key={i}
                src={src}
                alt="Partner"
                className="h-20 object-contain grayscale hover:grayscale-0 transition"
              />
            )
          )}
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="py-12">
        <div className="max-w-[1500px] mx-auto px-10">
          <h2 className="text-xl font-bold mb-6">
            Theo dõi chúng tôi trên Instagram để nhận tin tức & ưu đãi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {new Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  src={`https://picsum.photos/400/300?random=${i}`}
                  alt="Insta post"
                  className="h-40 w-full object-cover"
                />
                <div className="p-3 text-sm text-gray-600 line-clamp-3">
                  Trải nghiệm sản phẩm gaming chất lượng, nâng tầm hiệu suất làm việc và
                  giải trí.
                </div>
                <div className="p-3 text-xs text-gray-400">01/02/2025</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[900px] mx-auto text-center px-4">
          <p className="italic text-lg text-gray-700 mb-6">
            "Đơn hàng đầu tiên của tôi đến nơi trong tình trạng hoàn hảo. Dịch vụ tuyệt
            vời, giao hàng nhanh chóng. Tôi sẽ tiếp tục mua sắm ở đây trong tương lai."
          </p>
          <p className="font-semibold text-gray-900">– Toma Brown</p>
        </div>
      </div>

      {/* Services */}
      <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto py-12 px-4">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg mb-2">Hỗ trợ sản phẩm</h3>
          <p className="text-gray-600 text-sm">
            Bảo hành tận nơi lên đến 3 năm cho sự an tâm của bạn.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg mb-2">Tài khoản cá nhân</h3>
          <p className="text-gray-600 text-sm">
            Giảm giá, freeship và hỗ trợ kỹ thuật chuyên dụng.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg mb-2">Tiết kiệm tối đa</h3>
          <p className="text-gray-600 text-sm">
            Giảm đến 70% cho sản phẩm mới, luôn đảm bảo giá tốt nhất.
          </p>
        </div>
      </div>
    </div>
  );
}
