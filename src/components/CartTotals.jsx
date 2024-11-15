import { useShop } from "../utils/ShopContext";
import { formatPrice } from "../utils/index";

const CartTotals = () => {
  const { cartTotals } = useShop();
  const shipping = 150 * 100;
  const tax = 0.1 * cartTotals * 100;
  const total = cartTotals * 100 + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
      {/* Header */}
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Order Summary
      </h3>

      {/* Totals */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm border-b border-gray-300 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(cartTotals)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm border-b border-gray-300 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(shipping)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center text-sm border-b border-gray-300 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(tax)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold mt-6">
          <span className="text-gray-800 dark:text-gray-100">Order Total</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
