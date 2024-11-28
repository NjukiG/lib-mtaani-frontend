import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../utils/ShopContext";
import { formatPrice } from "../utils";

const SingleBook = () => {
  const { ID } = useParams();
  const { book, cartItems, fetchBookById, fetchCartDetails, addItemToCart } =
    useShop();

  useEffect(() => {
    fetchBookById(ID);
  }, [ID]);

  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const handleAddItem = () => {
    if (book?.ID) {
      addItemToCart(book.ID, amount);
    }
  };

  const dollarsAmount = book?.Price ? formatPrice(book.Price * 100) : "N/A";

  console.log(cartItems);

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {book ? (
        <>
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Books</Link>
              </li>
            </ul>
          </div>
          {/* PRODUCT */}
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img
                src={book.ImageUrl}
                alt={book.Title}
                className="object-cover w-full h-full"
              />
            </div>
            {/* PRODUCT INFO */}
            <div>
              <h1 className="capitalize text-3xl font-bold">{book.Title}</h1>
              <p className="mt-3 text-xl">{formatPrice(book.Price * 100)}</p>
              <p className="mt-6 leading-8">{book.Description}</p>

              {/* AMOUNT */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <h4 className="text-md font-medium tracking-wider capitalize">
                    Amount
                  </h4>
                </label>
                <select
                  className="select select-secondary select-bordered select-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={amount}
                  onChange={handleAmount}
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* CART BUTTON */}
              <div className="mt-10">
                <button
                  className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  onClick={handleAddItem}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </section>
  );
};

export default SingleBook;
