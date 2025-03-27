import PropTypes from 'prop-types';

const OrderSummary = ({ subtotal, shippingFee, grandTotal, handleConfirmOrder }) => {
  return (
    <div className="relative w-full bg-white shadow-2xl shadow-gray-900 p-6 rounded-t-3xl z-20">
      {/* Shadow Effect */}
      <div className="absolute -top-8  left-0 right-0 mx-auto h-8 bg-transparent">
        <div className="w-full max-h-full rounded-t-full shadow-3xl"></div>
      </div>

      {/* Order Details */}
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping Fee:</span>
        <span>${shippingFee.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between mb-4">
        <span className="font-bold">Grand Total:</span>
        <span className="font-bold">${grandTotal.toFixed(2)}</span>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmOrder}
        className="w-md bg-black text-white py-3 rounded-full mx-auto block"
      >
        Confirm Order
      </button>
    </div>
  );
};

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  shippingFee: PropTypes.number.isRequired,
  grandTotal: PropTypes.number.isRequired,
  handleConfirmOrder: PropTypes.func.isRequired,
};

export default OrderSummary;