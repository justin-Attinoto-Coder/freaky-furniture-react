import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CheckoutHeader = ({ navigate }) => {
  return (
    <div className="flex items-center justify-center mb-4 relative">
      <div
        className="absolute left-4 flex items-center cursor-pointer text-blue-500"
        onClick={() => navigate('/checkout-shipping')}
      >
        <FaArrowLeft className="text-xl" />
        <span className="hidden sm:inline-flex ml-2 text-lg font-medium">Return to Shipping</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold">Checkout</h2>
    </div>
  );
};
CheckoutHeader.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default CheckoutHeader;
