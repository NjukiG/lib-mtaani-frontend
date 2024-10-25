import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HomeLayout />
      Library mtaani
      <Routes>{/* <Route exact path="/" element={} /> */}</Routes>
      <Footer />
    </div>
  );
}

export default App;
