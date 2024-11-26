import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false); // For the modal

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      {" "}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="categoryTitle"
                className="block text-sm font-medium mb-2"
              >
                Category Title
              </label>
              <input
                type="text"
                id="categoryTitle"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter category title"
              />
              <div className="flex justify-end gap-4">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
