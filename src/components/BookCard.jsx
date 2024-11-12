import React from "react";
import { FiShoppingCart } from "react-icons/fi";
// import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { ID, Title, Description, ImageUrl, Price } = book;
  return (
    <Link
      to={`/books/${ID}`}
      className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
    >
      <div className="px-4 py-2">
        <h3
          // to={`/books/${book.ID}`}
          className="text-xl font-bold text-gray-800 uppercase dark:text-white"
        >
          {Title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {Description && Description.length > 100
            ? Description.slice(0, 100)
            : Description}
        </p>
      </div>

      <img
        className="object-cover w-full h-48 mt-2"
        // src={`${getImgUrl(book.coverImage)}`}
        src={ImageUrl}
        alt="book image"
      />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${Price}</h1>
        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
          <FiShoppingCart /> Add to cart
        </button>
      </div>
    </Link>
  );
};

export default BookCard;
