import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PrivateRoutes from "./utils/PrivateRoutes";
import SingleBook from "./pages/SingleBook";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashCategories from "./pages/Dashboard/DashCategories";
import DashBooks from "./pages/Dashboard/DashBooks";
import AddCategory from "./pages/Dashboard/AddCategory";
import EditBook from "./pages/Dashboard/EditBook";

function App() {
  return (
    <div>
      <HomeLayout />
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:ID" element={<SingleBook />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route
            path="/dashboard/dashcategories"
            element={<DashCategories />}
          />
          <Route
            path="/dashboard/dashcategories/addCategory"
            element={<AddCategory />}
          />

          <Route path="/dashboard/dashbooks" element={<DashBooks />} />
          <Route path="/editBook/:ID" element={<EditBook />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
