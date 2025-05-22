import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPayment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'creditCard',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save payment details to state or context
    navigate('/checkout-review');
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Payment Method</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentDetails.paymentMethod === 'creditCard'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Credit Card</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentDetails.paymentMethod === 'paypal'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">PayPal</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="paymentMethod"
                value="googlePay"
                checked={paymentDetails.paymentMethod === 'googlePay'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Google Pay</span>
            </label>
          </div>
        </div>
        {paymentDetails.paymentMethod === 'creditCard' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Card Holder&apos;s Name</label>
              <input
                type="text"
                name="cardHolderName"
                value={paymentDetails.cardHolderName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CheckoutPayment;