import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { ID, Title, Description, ImageUrl, Price } = book;

  return (
    <Link
      to={`/books/${ID}`}
      className="block max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      {/* Book Image */}
      <img className="object-cover w-full h-56" src={ImageUrl} alt={Title} />

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {Title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {Description || "No description available"}
        </p>
      </div>

      {/* Price and Add to Cart */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          ${Price.toFixed(2)}
        </h1>
        <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <FiShoppingCart />
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default BookCard;
