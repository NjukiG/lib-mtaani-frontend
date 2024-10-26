import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import BookCard from "./BookCard";

const TopSellers = () => {
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
  const [selectedCategory, setSelectedCategory] = useState("Choose a Category");

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === "Choose a Category"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLocaleLowerCase()
        );

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
            onClick={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      {/* Rendering the books */}

      {filteredBooks.map((book, index) => (
        <BookCard />
      ))}
    </div>
  );
};

export default TopSellers;
