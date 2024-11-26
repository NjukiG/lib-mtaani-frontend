import React, { useState } from "react";
import { useShop } from "../../utils/ShopContext";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

const DashCategories = () => {
  const { categories, addCategory } = useShop();
  const [isOpen, setIsOpen] = useState(false); // For the modal
  const [title, setTitle] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setTitle(""); // Clear input value when modal is closed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return; // Prevent empty submissions

    const titleInfo = { Title: title };
    addCategory(titleInfo);
    closeModal(); // Close the modal after submission
  };
  console.log(categories);

  return (
    <div className="overflow-x-auto">
      <SectionTitle text="Categories" />

      {/* Modal Start */}
      <div className="relative flex justify-center">
        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background Overlay */}
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={closeModal} // Close modal when clicking outside
              ></div>

              {/* Modal Content */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {/* Title */}
                  <div className="mt-2 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                      id="modal-title"
                    >
                      Add New Category
                    </h3>
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <label
                    htmlFor="Title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Category Title
                  </label>
                  <input
                    type="text"
                    id="Title"
                    name="Title"
                    value={title} // Bind value to state
                    onChange={(e) => setTitle(e.target.value)} // Update state on change
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="Enter category title"
                  />
                </form>

                {/* Action Buttons */}
                <div className="mt-5 sm:flex sm:items-center sm:justify-between">
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal End */}

      <div className="flex flex-row-reverse mb-2">
        <button
          onClick={openModal}
          className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        >
          Add Category
        </button>
      </div>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              ID
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Number of Books
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {categories.map((category) => (
            <tr key={category.ID}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                {category.ID}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {category.Title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {category.Books !== null ? category.Books.length : 0}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Update
                </a>
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashCategories;
