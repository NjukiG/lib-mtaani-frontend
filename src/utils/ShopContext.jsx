import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Create the ShopContext
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  

  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState(0);

  const token = localStorage.getItem("token");

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/public/api/categories"
      );
      const data = await response.json();
      setCategories(data.Categories);
      // console.log(data.Categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/public/api/books");
      const data = await response.json();
      setBooks(data.Books);
      // console.log(data.Books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  // Fetch books by ID
  const fetchBookById = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/public/api/books/${bookId}`
      );
      const data = await response.json();
      setBook(data.Book);
      console.log(data.Book);
    } catch (error) {
      console.error(`Failed to fetch book with ID ${bookId}:`, error);
    }
  };

  // Fetch products by category ID
  const fetchBooksByCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/public/api/categories/${categoryId}/books`
      );
      const data = await response.json();
      setCategoryBooks(data.Books);
      console.log(data.Books);
    } catch (error) {
      console.error(
        `Failed to fetch books for category with ID ${categoryId}:`,
        error
      );
    }
  };

  // Fetch cart by ID
  const fetchCartDetails = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/protected/api/cart/${user.ID}/review`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data && Array.isArray(data.CartItems)) {
        setCartItems(data.CartItems); // Correctly set the cart items
        setCartTotals(data.TotalPrice); // Assuming you have a state for total price
        console.log(data.CartItems);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error(`Failed to fetch book with ID ${cartId}:`, error);
    }
  };

  // function to add items to cart
  const addItemToCart = async (bookId, quantity) => {
    try {
      const response = await fetch(
        `http://localhost:3000/protected/api/cart/${user.ID}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId, quantity }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Update cart in context
        setCartItems(data["CartItem"]);
        console.log(data);
        // toast.success("Item added to cart");
        navigate("/");
      } else {
        console.error("Failed to add item:", data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch products and categories on initial render
  useEffect(() => {
    // if (!token) throw new Error("No token found");

    fetchCategories();
    fetchBooks();
    // fetchShippingDetails();
  }, []);

  const value = {
    categories,
    books,
    book,
    categoryBooks,
    cartItems,
    cartTotals,
    fetchCategories,
    fetchBooks,
    fetchBookById,
    fetchBooksByCategory,
    fetchCartDetails,
    addItemToCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Custom hook for using the ShopContext
export const useShop = () => {
  return useContext(ShopContext);
};
