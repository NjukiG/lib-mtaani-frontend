import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Create the ShopContext
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const value = {};
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Custom hook for using the ShopContext
export const useShop = () => {
  return useContext(ShopContext);
};
