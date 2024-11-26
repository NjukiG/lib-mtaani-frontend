import React, { useRef, useState } from "react";
import { useShop } from "../../utils/ShopContext";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";

const DashBooks = () => {
  const { books, addBookDetails, deleteBookByID, fetchBooks } = useShop();

  // const bookForm = useRef(null);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(500);
  const [copies, setCopies] = useState(10);
  const [description, setDescription] = useState("");
  const [trending, setTrending] = useState(false);
  const [categoryID, setCategoryID] = useState(1);

  const [isOpen, setIsOpen] = useState(false); // For the modal

  const resetForm = () => {
    setTitle("");
    setImageURL("");
    setPrice(500);
    setCopies(10);
    setDescription("");
    setTrending(false);
    setCategoryID(0);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetForm(); // Reset form on modal close
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = books.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = books.slice(startIndex, startIndex + itemsPerPage);

  const handleBookFormSubmit = (e) => {
    e.preventDefault();

    const bookInfo = {
      Title: title,
      ImageUrl: imageURL,
      Price: price,
      Copies: copies,
      Description: description,
      Trending: trending,
      CategoryID: categoryID,
    };

    addBookDetails(bookInfo);
    closeModal();
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBookByID(bookId);
        await fetchBooks(); // Refresh the book list after deletion
      } catch (error) {
        alert("Failed to delete the book. Please try again.");
      }
    }
  };

  console.log(books);
  return (
    <section className="container px-4 mx-auto">
      <SectionTitle text="Books" />

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
                      Add New Book
                    </h3>
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleBookFormSubmit} className="mt-4">
                  {/* Book Title */}
                  <div>
                    <label
                      htmlFor="Title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Book Title
                    </label>
                    <input
                      type="text"
                      id="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label
                      htmlFor="ImageUrl"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="ImageUrl"
                      value={imageURL}
                      onChange={(e) => setImageURL(e.target.value)}
                      required
                      className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                      placeholder="Enter image URL"
                    />
                  </div>
                  {/* Book Price */}

                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="Price"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="Price"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Copies"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Copies
                      </label>
                      <input
                        type="number"
                        id="Copies"
                        value={copies}
                        onChange={(e) => setCopies(parseInt(e.target.value))}
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                  </div>
                  {/* Book description */}

                  <div>
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description
                    </label>
                    <textarea
                      id="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                      placeholder="Enter description"
                    />
                  </div>
                  {/* Is bookm trending? */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="Trending"
                      checked={trending}
                      onChange={(e) => setTrending(e.target.checked)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="Trending"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Trending
                    </label>
                  </div>
                  {/* Category ID for book  CategoryID */}
                  <div>
                    <label
                      htmlFor="CategoryID"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Category ID
                    </label>
                    <input
                      type="number"
                      id="CategoryID"
                      value={categoryID}
                      onChange={(e) => setCategoryID(parseInt(e.target.value))}
                      className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex justify-end space-x-2">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal End */}

      <div className="sm:flex flex-row-reverse sm:items-center sm:justify-between mb-2 ">
        <div className="flex items-center mt-4 gap-x-3">
          <button
            onClick={openModal}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3098_154395)">
                <path
                  d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3098_154395">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>Upload Book</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      {/* IMG */}
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <button className="flex items-center gap-x-2">
                          <span>Category ID</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Date Added
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Trending
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Copies
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Price
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {/* Example row structure */}
                  {currentItems &&
                    currentItems.map((book) => {
                      return (
                        <tr key={book.ID}>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-8 h-8 rounded-full"
                                src={book.ImageUrl}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {book.Title}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              {book.CategoryID}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {book.CreatedAt}
                          </td>

                          {/*  */}
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {book.Trending === true ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="-ms-1 me-1.5 size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>

                                <p className="whitespace-nowrap text-sm">
                                  True
                                </p>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 dark:bg-red-700 dark:text-red-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="-ms-1 me-1.5 size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                  />
                                </svg>

                                <p className="whitespace-nowrap text-sm">
                                  False
                                </p>
                              </span>
                            )}
                          </td>

                          {/*  */}

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {book.Copies}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            KES: {book.Price}
                          </td>

                          <td className="whitespace-nowrap px-4 py-2">
                            <Link
                              to={`/editBook/${book.ID}`}
                              className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                            >
                              Update
                            </Link>
                          </td>

                          <td className="whitespace-nowrap px-4 py-2">
                            <button
                              onClick={() => handleDelete(book.ID)}
                              className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination starts here. */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 text-black rounded ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-black"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-200 text-black rounded ${
            currentPage === totalPages ? "cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DashBooks;
