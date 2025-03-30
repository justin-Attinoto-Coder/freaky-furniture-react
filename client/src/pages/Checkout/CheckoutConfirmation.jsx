import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaCheckCircle, FaThumbsUp } from 'react-icons/fa';

const CheckoutConfirmation = ({ customerName, shippingAddress, billingAddress, shippingMethod, paymentMethod, orderSummary }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <div className="block text-center mb-8">
        <div className="flex justify-center items-center space-x-4">
          <FaShoppingCart className="text-blue-500 text-4xl" />
          <FaCheckCircle className="text-green-500 text-4xl" />
          <FaThumbsUp className="text-yellow-500 text-4xl" />
        </div>
        <p className="text-gray-700 mt-4">Your order has been successfully placed!</p>
      </div>

      {/* Thank You Message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold">Thank you, {customerName}!</h1>
        <hr className="my-4 border-gray-300" />
        <p className="text-lg sm:text-xl text-gray-700">
          Your order is confirmed.
        </p>
        <p className="text-gray-600">
          We`&apos;`ve accepted your order and we`&apos;`re getting ready to dispatch it for delivery.
        </p>
        <hr className="my-4 border-gray-300" />
      </div>

      {/* Customer Information */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold text-gray-800">Shipping Address</h3>
            <p className="text-gray-600">{shippingAddress}</p>
          </div>
          {/* Billing Address */}
          <div>
            <h3 className="font-semibold text-gray-800">Billing Address</h3>
            <p className="text-gray-600">{billingAddress}</p>
          </div>
          {/* Shipping Method */}
          <div>
            <h3 className="font-semibold text-gray-800">Shipping Method</h3>
            <p className="text-gray-600">{shippingMethod}</p>
          </div>
          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-gray-800">Payment Method</h3>
            <p className="text-gray-600">{paymentMethod}</p>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            <strong>Subtotal:</strong> ${orderSummary.subtotal.toFixed(2)}
          </p>
          <p className="text-gray-700">
            <strong>Shipping Fee:</strong> ${orderSummary.shippingFee.toFixed(2)}
          </p>
          <p className="text-gray-700">
            <strong>Grand Total:</strong> ${orderSummary.grandTotal.toFixed(2)}
          </p>
        </div>
      </div>
      <button onClick={handleContinueShopping} className="bg-blue-500 text-white px-4 py-2 rounded mt-8">
        Continue Shopping
      </button>
    </div>
  );
};

CheckoutConfirmation.propTypes = {
  customerName: PropTypes.string.isRequired,
  shippingAddress: PropTypes.string.isRequired,
  billingAddress: PropTypes.string.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  orderSummary: PropTypes.shape({
    subtotal: PropTypes.number.isRequired,
    shippingFee: PropTypes.number.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }).isRequired,
};

CheckoutConfirmation.defaultProps = {
  customerName: 'Customer',
  shippingAddress: 'N/A',
  billingAddress: 'N/A',
  shippingMethod: 'Standard Shipping',
  paymentMethod: 'Credit Card',
  orderSummary: {
    subtotal: 0,
    shippingFee: 0,
    grandTotal: 0,
  },
};

export default CheckoutConfirmation;