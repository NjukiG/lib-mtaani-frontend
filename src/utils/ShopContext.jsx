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
  const [shippingDetails, setShippingDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});

  const token = localStorage.getItem("token");

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/public/api/categories"
      );
      const data = await response.json();
      setCategories(data.Categories);
      // console.log(data.Categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Add a new category
  const addCategory = async (title) => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(title),
        }
      );
      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data.Category]);
      console.log("New category added:", data);
    } catch (error) {
      console.error("Failed to add new category:", error);
      if (error.response) {
        alert(error.response.data.Error || "Failed to add category.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  // Function to add book details
  const addBookDetails = async (bookDetails) => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/protected/api/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Failed to add the book.");
      }

      const data = await response.json();

      setBooks((prevBooks) => [...prevBooks, data.Book]);

      console.log("Book added successfully:", data.Book);
      // return data.Book;
    } catch (error) {
      console.error("Error adding new book:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  };

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/public/api/books"
      );
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
        `https://library-mtaani.onrender.com/public/api/books/${bookId}`
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
        `https://library-mtaani.onrender.com/public/api/categories/${categoryId}/books`
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

  // Update book details
  const updateBookByID = async (bookId, updatedDetails) => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is set for authentication
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Failed to update the book.");
      }

      const updatedBook = await response.json();

      // Update the state with the new book details
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.ID === bookId ? updatedBook : book))
      );

      console.log("Book updated successfully:", updatedBook);
      return updatedBook; // Return updated book if needed
    } catch (error) {
      console.error("Error updating book:", error.message);
      throw error; // Re-throw the error for handling in the UI
    }
  };

  // Delete book
  const deleteBookByID = async (bookId) => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure the token is included
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }

      const result = await response.json();
      console.log("Book deleted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error; // Allow the calling component to handle the error
    }
  };

  // Fetch cart by ID
  const fetchCartDetails = async (cartId) => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/cart/${user.ID}/review`,
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
        `https://library-mtaani.onrender.com/protected/api/cart/${user.ID}/items`,
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

  // Function to remove an item from the cart
  const removeItemFromCart = async (bookId) => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/cart/${user.ID}/items/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Update cart in context
        const updatedCart = cartItems.filter((item) => item.bookId !== bookId);
        setCartItems(updatedCart);
        console.log("Removed item", updatedCart);
        // toast.error("Item removed from your cart");
        navigate("/");
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to add shipping details
  const addShippingDetails = async (shippingDetails) => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/protected/api/shipping-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shippingDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add shipping details");
      }

      const data = await response.json();
      setShippingDetails(data.ShippingDetails); // Update the state with the newly added details
      console.log("Shipping details added:", data.ShippingDetails);
    } catch (error) {
      console.error("Error adding shipping details:", error);
    }
  };

  // Fetch Shipping details
  const fetchShippingDetails = async () => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/protected/api/shipping-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.ShippingDetails);
      setShippingDetails(data.ShippingDetails);
    } catch (error) {
      console.error("Failed to fetch shipping details:", error);
    }
  };

  // Update Shipping details
  const updateShippingDetails = async (details) => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/protected/api/shipping-details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(details),
        }
      );

      const data = await response.json();
      console.log(data);
      setShippingDetails(data);
      // toast.success("Shiiping details updated");
      navigate("/checkout");
    } catch (error) {
      console.error(error);
      // toast.error("Please double check your details");
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/cart/${user.ID}/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOrders(data.Orders);
      console.log(data.Orders);
    } catch (error) {
      console.error(`Failed to fetch orders with ID ${user.ID} :`, error);
    }
  };

  // Make and order
  const makeNewOrder = async () => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/cart/${user.ID}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(),
        }
      );

      const data = await response.json();
      console.log(data.Order);
      // setOrders(data.Order);
      // toast.success(data.Message);
      navigate("/orders");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch orders
  const fetchOrderSummary = async () => {
    try {
      const response = await fetch(
        `https://library-mtaani.onrender.com/protected/api/${user.ID}/orders/summary`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOrderSummary(data);
      console.log(data);
    } catch (error) {
      console.error(`Failed to fetch orders with ID ${user.ID} :`, error);
    }
  };
  // Fetch books and categories on initial render
  useEffect(() => {
    // if (!token) throw new Error("No token found");

    fetchCategories();
    fetchBooks();
    fetchCartDetails();
    // fetchOrderSummary();
  }, []);

  const value = {
    categories,
    books,
    book,
    categoryBooks,
    cartItems,
    cartTotals,
    shippingDetails,
    orders,
    orderSummary,
    addCategory,
    addBookDetails,
    fetchCategories,
    fetchBooks,
    fetchBookById,
    updateBookByID,
    deleteBookByID,
    fetchBooksByCategory,
    fetchCartDetails,
    addItemToCart,
    removeItemFromCart,
    addShippingDetails,
    fetchShippingDetails,
    updateShippingDetails,
    fetchOrders,
    makeNewOrder,
    fetchOrderSummary,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Custom hook for using the ShopContext
export const useShop = () => {
  return useContext(ShopContext);
};
