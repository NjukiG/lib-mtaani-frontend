import React, { useState } from "react";
import { formatPrice } from "../utils/index";
import { useShop } from "../utils/ShopContext";

const CartItem = ({ cartItem }) => {
  const { removeItemFromCart } = useShop();
  const [amount, setAmount] = useState(cartItem.quantity);
  const {
    ID,
    Title,
    Price,
    ImageUrl,
    Description,
  } = cartItem.book;

  const handleRemoveItem = () => {
    removeItemFromCart(ID);
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <article className="flex flex-col sm:flex-row items-start gap-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      {/* IMAGE */}
      <div className="flex-shrink-0">
        <img
          src={ImageUrl}
          alt={Title}
          className="h-32 w-32 rounded-lg object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {Title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {Description && Description.length > 100
              ? `${Description.slice(0, 100)}...`
              : Description}
          </p>
        </div>

        {/* Quantity and Remove */}
        <div className="flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div>
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Quantity
            </label>
            <select
              id="amount"
              value={amount}
              onChange={handleAmount}
              className="block mt-1 rounded-lg border-gray-300 bg-gray-100 px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200"
            >
              {[1].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemoveItem}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex-shrink-0 text-right">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {formatPrice(Price * 100 * amount)}
        </p>
      </div>
    </article>
  );
};

export default CartItem;
