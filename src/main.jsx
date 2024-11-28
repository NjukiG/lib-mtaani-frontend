import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext.jsx";
import { ShopProvider } from "./utils/ShopContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ShopProvider>
        <StrictMode>
          <App />
          <ToastContainer position="top-center" />
        </StrictMode>
      </ShopProvider>
    </AuthProvider>
  </BrowserRouter>
);
