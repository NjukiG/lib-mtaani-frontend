import { useState } from "react";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <HomeLayout />
      Library mtaani
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
