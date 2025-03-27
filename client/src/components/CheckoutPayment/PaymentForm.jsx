import PaymentMethodSelector from './PaymentMethodSelector';
import PropTypes from 'prop-types';

const PaymentForm = ({ paymentDetails, shippingDetails = {}, handleChange, handleSubmit }) => {
  const {
    streetAddress = 'N/A',
    city = 'N/A',
    postalCode = 'N/A',
    carrier = 'N/A',
    shippingMethod = 'N/A',
  } = shippingDetails; // Destructure with default values

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0"
    >
      {/* Shipping Address and Method (visible only above sm breakpoint) */}
      <div className="hidden sm:col-span-2 sm:block">
        <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
        <p>
          {streetAddress}, {city}, {postalCode}
        </p>
        <h3 className="text-lg font-bold mt-4">Shipping Method</h3>
        <p>
          {carrier} - {shippingMethod}
        </p>
      </div>

      {/* Payment Method Selector (hidden for mobile) */}
      <div className="sm:hidden block sm:col-span-2">
        <PaymentMethodSelector paymentDetails={paymentDetails} handleChange={handleChange} />
      </div>

      {/* Credit Card Details (conditionally rendered) */}
      {paymentDetails.paymentMethod === 'creditCard' && (
        <>
          <div className="w-full sm:col-span-2 sm:w-auto flex flex-col">
            <label className="ml-4 block text-black-700 font-bold text-left">Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              placeholder="4111 1111 1111 1111"
              className="w-7/8 sm:w-auto p-3 bg-gray-100 rounded-xl"
              required
            />
          </div>

          <div className="w-full sm:w-auto flex flex-col">
            <label className="block ml-4 text-black-700 font-bold text-left">Card Holder&apos;s Name *</label>
            <input
              type="text"
              name="cardHolderName"
              value={paymentDetails.cardHolderName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-7/8 sm:w-auto p-3 bg-gray-100 rounded-xl"
              required
            />
          </div>

          {/* Expiry Date and CVV on the same line for mobile */}
          <div className="flex flex-row gap-x-4 sm:flex-col sm:gap-y-4 w-full items-center">
            {/* Expiry Date */}
            <div className="flex-1 flex flex-col ml-4">
              <label className="block text-black-700 font-bold">Expiry Date *</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-1/2 p-4 bg-gray-100 rounded-xl"
                required
              />
            </div>

            {/* CVV */}
            <div className="flex-1 flex flex-col sm:absolute sm:left-5/9">
              <label className="block text-black-700 font-bold ml-4">CVV *</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-1/3 p-4 bg-gray-100 rounded-xl"
                required
              />
            </div>
          </div>
        </>
      )}

      {/* Billing Address (hidden for mobile) */}
      <div className="hidden sm:block sm:col-span-2">
        <h3 className="text-lg font-bold mt-6 mb-4">Billing Address</h3>
        <label className="block">
          <input
            type="radio"
            name="billingAddress"
            value="same"
            checked={paymentDetails.billingAddress === 'same'}
            onChange={handleChange}
            className="mr-2"
          />
          Same as shipping address
        </label>
        <label className="block">
          <input
            type="radio"
            name="billingAddress"
            value="different"
            checked={paymentDetails.billingAddress === 'different'}
            onChange={handleChange}
            className="mr-2"
          />
          Different than shipping address
        </label>
      </div>

      {/* Remember Me (hidden for mobile) */}
      <div className="hidden sm:block sm:col-span-2 mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={paymentDetails.rememberMe}
            onChange={handleChange}
            className="form-checkbox text-green-500"
          />
          <span className="ml-2 text-gray-700">Remember me</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-end">
        <button
          type="submit"
          className="mt-8 mb-8 w-sm shadow-lg shadow-gray-500/50 sm:w-auto bg-black sm:bg-blue-500 text-white px-4 py-2 rounded-full sm:rounded sm:font-bold sm:text-lg"
        >
          {/* Mobile Text */}
          <span className="block sm:hidden">Confirm</span>
          {/* Desktop Text */}
          <span className="hidden sm:block">Continue to Review</span>
        </button>
      </div>
    </form>
  );
};

PaymentForm.propTypes = {
  paymentDetails: PropTypes.shape({
    paymentMethod: PropTypes.string.isRequired,
    cardNumber: PropTypes.string,
    cardHolderName: PropTypes.string,
    expiryDate: PropTypes.string,
    cvv: PropTypes.string,
    billingAddress: PropTypes.string.isRequired,
    rememberMe: PropTypes.bool.isRequired,
  }).isRequired,
  shippingDetails: PropTypes.shape({
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    carrier: PropTypes.string,
    shippingMethod: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PaymentForm;