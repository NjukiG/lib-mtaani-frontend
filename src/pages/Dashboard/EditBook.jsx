import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShop } from "../../utils/ShopContext";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";

const EditBook = () => {
  const { ID } = useParams(); // Book ID from URL
  const navigate = useNavigate();
  const { fetchBookById, book, updateBookByID } = useShop();

  const [updatedBookDetails, setUpdatedBookDetails] = useState(null); // Local state for updates
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch book details on component mount or when the ID changes
  useEffect(() => {
    const loadBook = async () => {
      try {
        await fetchBookById(ID); // Fetch and populate `book` in the context
        setLoading(false);
      } catch (err) {
        setError("Failed to load book details");
        setLoading(false);
      }
    };
    loadBook();
  }, [ID]);

  // Initialize form with fetched book details
  useEffect(() => {
    if (book) {
      console.log("Fetched book:", book);

      setUpdatedBookDetails({
        Title: book.Title || "",
        ImageUrl: book.ImageUrl || "",
        Price: book.Price || 0,
        Copies: book.Copies || 0,
        Description: book.Description || "",
        Trending: book.Trending || false,
        CategoryID: book.CategoryID || 1,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUpdatedBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateBookByID(ID, updatedBookDetails); // Update the book using context function
      navigate("/dashboard"); // Redirect after successful edit
    } catch (err) {
      setError("Failed to update book details");
      setLoading(false);
    }
  };

  console.log(book);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto my-8">
      <SectionTitle text="Edit Book" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={updatedBookDetails?.Title || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
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
            name="ImageUrl"
            value={updatedBookDetails?.ImageUrl || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
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
            name="Price"
            value={updatedBookDetails?.Price || ""}
            onChange={handleChange}
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
            name="Copies"
            value={updatedBookDetails?.Copies || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div>
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={updatedBookDetails?.Description || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="Trending"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Trending
          </label>
          <input
            type="checkbox"
            id="Trending"
            name="Trending"
            checked={updatedBookDetails?.Trending || false} // Dynamically set the checked value
            onChange={(e) => {
              const isChecked = e.target.checked;
              console.log("Checkbox value:", isChecked);
              setUpdatedBookDetails((prevDetails) => ({
                ...prevDetails,
                Trending: isChecked, // Update the Trending value in state
              }));
            }}
            className="mr-2"
          />
        </div>
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
            name="CategoryID"
            value={updatedBookDetails?.CategoryID || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button> */}

        <div className="mt-5 flex justify-end space-x-2">
          <Link
            to="/dashboard/dashbooks"
            className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
