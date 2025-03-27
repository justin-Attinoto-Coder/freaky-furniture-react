const OrderSummary = () => {
  return (
    <div className="hidden sm:block bg-gray-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      {/* Add order summary details here */}
      <p>Order summary details will go here.</p>

      {/* Discount Code Form */}
      <div className="mt-6">
        <label className="block text-gray-700 font-bold mb-2">Discount Code</label>
        <input
          type="text"
          placeholder="Enter discount code"
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full">
          Apply
        </button>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-8">
        <label className="block text-gray-700 font-bold mb-2">Subscribe to Newsletter</label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;