import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Slider from "react-slick";
import { useShop } from "../utils/ShopContext";
import SectionTitle from "./SectionTitle";

const Recomended = () => {
  const { categories, books, fetchCategories, fetchBooksByCategory } =
    useShop();

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
      <SectionTitle text="Recommended for you" />

      {/* Rendering the books */}
      <Slider {...settings}>
        {books &&
          books
            .slice(8, 15)
            .map((book) => <BookCard key={book.ID} book={book} />)}
      </Slider>
    </div>
  );
};

export default Recomended;
