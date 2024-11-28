import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Validate user on each load. If logged in or not.
  useEffect(() => {
    checkUserStatus();
  }, []);

  // Register new user handler
  const registerUser = async (userData) => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/public/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      toast(data.Message);
    } catch (error) {
      console.error("Register user error:", error);
    }
  };

  // Login handler
  const loginUser = async (credentials) => {
    try {
      const response = await fetch(
        "https://library-mtaani.onrender.com/public/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      localStorage.setItem("token", data.token);
      await checkUserStatus();
      console.log(data);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Login user error:",
        error || "Please double check your credentials"
      );
      toast.error("Please double check your credentials");
    }
  };

  // Logout user
  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  //  Validates user status if logged in or not.
  const checkUserStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        "https://library-mtaani.onrender.com/protected/api/validate",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setUser(data.User);
      console.log(data.User);
    } catch (error) {
      console.error("Check user status error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, logoutUser, checkUserStatus, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
