import React from "react";
import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill, BsCart3 } from "react-icons/bs";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useShop } from "../utils/ShopContext";
// import { FaBarsStaggered } from "react-icons/fa6";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.winter;
};

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { cartItems } = useShop();
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  const handleTheme = () => {
    const { winter, dracula } = themes;
    const newTheme = theme === winter ? dracula : winter;
    setTheme(newTheme);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  console.log(user);
  return (
    <div className="navbar sticky bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* <Link to="/dashboard">Dashboard</Link> */}
            <NavLinks />
          </ul>
        </div>
        {/* THEME ICONS */}{" "}
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleTheme} />
          {/* sun icon*/}
          <BsSunFill className="swap-on h-4 w-4" />
          {/* moon icon*/}
          <BsMoonFill className="swap-off h-4 w-4" />
        </label>
      </div>
      <div className="navbar-center">
        {/* Title */}
        <NavLink
          to="/"
          className="hidden lg:flex btn btn-primary text-3xl items-center "
        >
          libMtaani
        </NavLink>
      </div>
      <div className="navbar-end">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}

        {/* CART LINK*/}
        <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
          <div className="indicator">
            <BsCart3 className="h-6 w-6" />
            <span className="badge badge-sm badge-primary indicator-item">
              {cartItems.length}
            </span>
          </div>
        </NavLink>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.Name ? user.Name.charAt(0).toUpperCase() : "?"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
