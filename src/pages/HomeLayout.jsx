import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <section className="align-element py-5">
      <Outlet />
    </section>
  );
};

export default HomeLayout;
