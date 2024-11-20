import React, { useEffect } from "react";
import RevenueChart from "./RevenueChart";
import { useShop } from "../../utils/ShopContext";

const DashboardSummary = () => {
  const { categories, books, orderSummary, fetchOrderSummary } = useShop();

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  if (!orderSummary) {
    return <div>Loading...</div>;
  }

  console.log(orderSummary);
  return (
    <main className="flex flex-col w-full p-6 bg-gray-300 min-h-screen">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of Library-Mtaani's performance.
        </p>
      </header>

      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Revenue",
            value: `${orderSummary.total_revenue}`,
            icon: "💰",
          },
          {
            title: "Orders",
            value: orderSummary.total_orders,
            icon: "📦",
          },
          {
            title: "Categories",
            value: categories.length,
            icon: "👥",
          },
          {
            title: "Books",
            value: books.length,
            icon: "🛒",
          },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-3xl">{metric.icon}</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">
                {metric.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Orders Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-200 text-sm uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  id: "ORD-001",
                  customer: "John Doe",
                  total: "$150",
                  status: "Shipped",
                  date: "Nov 14, 2024",
                },
                {
                  id: "ORD-002",
                  customer: "Jane Smith",
                  total: "$120",
                  status: "Pending",
                  date: "Nov 13, 2024",
                },
                {
                  id: "ORD-003",
                  customer: "Tom Lee",
                  total: "$200",
                  status: "Delivered",
                  date: "Nov 12, 2024",
                },
              ].map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-3">{order.id}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3">{order.total}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Shipped"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Product 1",
              sales: "1,200",
              image: "https://via.placeholder.com/150",
            },
            {
              name: "Product 2",
              sales: "980",
              image: "https://via.placeholder.com/150",
            },
            {
              name: "Product 3",
              sales: "850",
              image: "https://via.placeholder.com/150",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">Sales: {product.sales}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <RevenueChart />
      </section>
    </main>
  );
};

export default DashboardSummary;
