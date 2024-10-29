import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Slider from "react-slick";

const Recomended = () => {
  const categories = [
    "Choose a Category",
    "Adventure",
    "Business",
    "Fiction",
    "Horror",
    "Marketing",
    "Books",
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

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
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>
      {/* Rendering the books */}
      <Slider {...settings}>
        {books &&
          books.slice(8, 15).map((book, index) => <BookCard key={index} book={book} />)}
      </Slider>
    </div>
  );
};

export default Recomended;
