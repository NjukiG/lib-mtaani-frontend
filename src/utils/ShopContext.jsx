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

  // Function to remove an item from the cart
  const removeItemFromCart = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/protected/api/cart/${user.ID}/items/${bookId}`,
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
        "http://localhost:3000/protected/api/shipping-details",
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
        "http://localhost:3000/protected/api/shipping-details",
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
        "http://localhost:3000/protected/api/shipping-details",
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
        `http://localhost:3000/protected/api/cart/${user.ID}/orders`,
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
        `http://localhost:3000/protected/api/cart/${user.ID}/orders`,
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
        `http://localhost:3000/protected/api/${user.ID}/orders/summary`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOrderSummary(data)
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
    fetchCategories,
    fetchBooks,
    fetchBookById,
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
