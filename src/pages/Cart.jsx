import React from "react";
import { useShop } from "../utils/ShopContext";

const Cart = () => {
  const { user } = useShop();
  console.log(user)
  return <div>Cart</div>;
};

export default Cart;
