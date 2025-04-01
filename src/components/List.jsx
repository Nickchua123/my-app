import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const products = [
  { id: 1, name: "Sản phẩm 1", price: "200.000đ", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Sản phẩm 2", price: "300.000đ", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sản phẩm 3", price: "400.000đ", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Sản phẩm 4", price: "250.000đ", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Sản phẩm 5", price: "350.000đ", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Sản phẩm 6", price: "450.000đ", image: "https://via.placeholder.com/150" },
  { id: 7, name: "Sản phẩm 7", price: "500.000đ", image: "https://via.placeholder.com/150" },
  { id: 8, name: "Sản phẩm 8", price: "600.000đ", image: "https://via.placeholder.com/150" },
  { id: 9, name: "Sản phẩm 9", price: "700.000đ", image: "https://via.placeholder.com/150" },
  { id: 10, name: "Sản phẩm 10", price: "800.000đ", image: "https://via.placeholder.com/150" },
  { id: 11, name: "Sản phẩm 11", price: "900.000đ", image: "https://via.placeholder.com/150" },
  { id: 12, name: "Sản phẩm 12", price: "1.000.000đ", image: "https://via.placeholder.com/150" },
];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const List = ({ title }) => {
  return (
    <div className="max-w-[1200px] w-full mx-auto bg-amber-200  p-2 mb-3 rounded-lg">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 p-4">{title}</h1>
      </div>
      <Carousel responsive={responsive} itemClass="px-1">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="text-center mt-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-red-500 font-semibold">{product.price}</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
};

export default List;
