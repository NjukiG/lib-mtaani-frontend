import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import BookCard from "./BookCard";
import Slider from "react-slick";
import { useShop } from "../utils/ShopContext";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const { categories, books, fetchCategories, fetchBooksByCategory } =
    useShop();

  const [selectedCategory, setSelectedCategory] = useState("Choose a Category");

  const filteredBooks =
    selectedCategory === "Choose a Category"
      ? books
      : books.filter((book) => book.CategoryID === parseInt(selectedCategory));

  var settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* Category Filtering */}
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick your prefered category</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Choose a Category</option>
            {categories.map((category, index) => {
              return (
                <option key={category.ID} value={category.ID}>
                  {category.ID}. {category.Title}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      <br />

      {/* Rendering the books */}
      <Slider {...settings}>
        {filteredBooks &&
          filteredBooks.map((book) => <BookCard key={book.ID} book={book} />)}
      </Slider>
    </div>
  );
};

export default TopSellers;
