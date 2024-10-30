import { useState } from "react";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <HomeLayout />
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
