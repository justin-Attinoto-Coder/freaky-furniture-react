import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';
import { SiMastercard, SiPaypal } from 'react-icons/si'; // Placeholder icons
import { FcGoogle } from 'react-icons/fc'; // Google "G" logo with rainbow colors

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      cardHolderName: paymentDetails.cardHolderName,
      cardNumber: paymentDetails.cardNumber,
      expiryDate: paymentDetails.expiryDate,
      cvv: paymentDetails.cvv,
    };

    console.log('Sending payment data:', paymentData); // Debugging log

    try {
      const response = await fetch('http://localhost:8000/api/payment-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        console.log('Payment details saved successfully.');
        navigate('/checkout-review'); // Navigate to the Review page
      } else {
        const errorData = await response.json();
        console.error('Failed to save payment details:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header Section */}
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

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 mx-auto" style={{ maxWidth: '80%' }}>
        {/* Shipping Step */}
        <div className="flex flex-col items-center">
          <FaBoxOpen className="text-2xl text-black bg-black p-2 rounded-full" />
          <span className="text-sm font-bold">Shipping</span>
        </div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        {/* Payment Step */}
        <div className="flex flex-col items-center">
          <FaCreditCard className="text-2xl text-black border-2 border-black bg-white p-2 rounded-full" />
          <span className="text-sm font-bold">Payment</span>
        </div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        {/* Review Step */}
        <div className="flex flex-col items-center">
          <FaClipboardCheck className="text-2xl text-gray-300" />
          <span className="text-sm text-gray-300 font-bold">Review</span>
        </div>
      </div>

      <div className="w-sm text-center mx-auto">
        {/* Payment Form */}
        <h2 className="text-lg font-bold text-center mb-4">Select a Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-12">
            {/* Credit Card Option */}
            <div className="flex items-center">
              <div className="bg-white shadow-md rounded-lg p-4">
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
              <div className="bg-white shadow-md rounded-lg p-4">
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
              <div className="bg-white shadow-md rounded-lg p-4">
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

          {/* Credit Card Details */}
          {paymentDetails.paymentMethod === 'creditCard' && (
            <>
              <div className="mb-4">
                <label className="ml-4 block text-start font-bold text-black-700">Card Holder&apos;s Name</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentDetails.cardHolderName}
                  onChange={handleChange}
                  placeholder="Enter card holder name"
                  className="w-sm p-3 bg-gray-100 rounded-2xl placeholder-gray-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="ml-4 block font-bold text-start text-black-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="4111 1111 1111 1111"
                  className="w-sm p-3 bg-gray-100 rounded-2xl placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="mb-4 w-1/4">
                  <label className="block font-bold text-sm text-black-700">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full p-4 text-center bg-gray-100 rounded-2xl placeholder-gray-400"
                    required
                  />
                </div>
                <div className="ml-auto mr-5 mb-4 w-1/5">
                  <label className="block font-bold text-center text-black-700">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full p-4 bg-gray-100 text-center rounded-2xl placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="my-8 w-sm text-2xl shadow-lg shadow-gray-500/50 sm:w-auto bg-black text-white px-4 py-2 rounded-full sm:font-bold sm:text-lg"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPayment;