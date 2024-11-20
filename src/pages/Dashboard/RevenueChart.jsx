// src/components/RevenueChart.jsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Sales Chart Data
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales ($)",
        data: [
          1200, 1900, 3000, 5000, 2000, 3100, 4500, 3900, 4200, 4700, 5300,
          6000,
        ],
        borderColor: "#4880d7",
        backgroundColor: "rgba(72, 128, 215, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Revenue Chart Data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [800, 1200, 1500, 2500, 2000, 3000],
        backgroundColor: [
          "#1e90ff",
          "#1e90ff80",
          "#1e90ff60",
          "#1e90ff40",
          "#1e90ff20",
          "#1e90ff10",
        ],
        borderRadius: 8,
      },
    ],
  };

  return (
    <main className="flex flex-col w-full p-6 bg-gray-100 min-h-screen">
      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Sales
          </h2>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: { legend: { display: true, position: "top" } },
            }}
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: { legend: { display: true, position: "top" } },
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default RevenueChart;
