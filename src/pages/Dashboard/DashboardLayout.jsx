import React from "react";
import DashboardSummary from "./DashboardSummary";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <section className="flex min-h-screen overflow-hidden grid-container">
      {/* Dashboard sidebar */}
      <DashboardSidebar />

      {/* Dashboard main page currently with fake data */}
      <DashboardSummary />
    </section>
  );
};

export default DashboardLayout;
