import { SiMastercard, SiPaypal } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

import PropTypes from 'prop-types';

const PaymentMethodSelector = ({ paymentDetails, handleChange }) => {

return (
  <div className="w-md mx-auto sm:col-span-2">
    <h3 className="text-lg text-center font-bold mb-4">Select a Payment Method</h3>
    <div className="flex flex-col gap-6 mb-6">
      {/* Credit Card Option */}
      <div className="flex items-center">
        <div className="bg-white shadow-md shadow-gray-500/50 rounded-xl p-2">
          <SiMastercard className="text-3xl text-red-500" />
        </div>
        <span className="ml-4 italic text-2xl font-medium">Credit Card</span>
        <input
          type="radio"
          name="paymentMethod"
          value="creditCard"
          checked={paymentDetails.paymentMethod === 'creditCard'}
          onChange={handleChange}
          className="ml-auto form-radio"
        />
      </div>

      {/* PayPal Option */}
      <div className="flex items-center">
        <div className="bg-white shadow-md shadow-gray-500/50 rounded-xl p-2">
          <SiPaypal className="text-3xl text-blue-500" />
        </div>
        <span className="ml-4 italic text-2xl font-medium">PayPal</span>
        <input
          type="radio"
          name="paymentMethod"
          value="paypal"
          checked={paymentDetails.paymentMethod === 'paypal'}
          onChange={handleChange}
          className="ml-auto form-radio"
        />
      </div>

      {/* Google Pay Option */}
      <div className="flex items-center">
        <div className="bg-white shadow-md shadow-gray-500/50 rounded-xl p-2">
          <FcGoogle className="text-3xl" />
        </div>
        <span className="ml-4 italic text-2xl font-medium">Google Pay</span>
        <input
          type="radio"
          name="paymentMethod"
          value="googlePay"
          checked={paymentDetails.paymentMethod === 'googlePay'}
          onChange={handleChange}
          className="ml-auto form-radio"
        />
      </div>
    </div>
  </div>
);

};

PaymentMethodSelector.propTypes = {
  paymentDetails: PropTypes.shape({
    paymentMethod: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PaymentMethodSelector;