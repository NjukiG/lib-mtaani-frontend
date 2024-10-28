import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  console.log(book);
  return (
    <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="px-4 py-2">
        <Link to={`/books/${book._id}`} className="text-xl font-bold text-gray-800 uppercase dark:text-white">
          {book.title}
        </Link>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {book.description.length > 100
            ? book.description.slice(0, 100)
            : book.description}
        </p>
      </div>

      <img
        className="object-cover w-full h-48 mt-2"
        src={`${getImgUrl(book.coverImage)}`}
        alt="NIKE AIR"
      />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${book.newPrice}</h1>
        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
          <FiShoppingCart /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
