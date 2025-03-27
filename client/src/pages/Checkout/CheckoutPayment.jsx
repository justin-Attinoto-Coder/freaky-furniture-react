import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from '../../components/common/CheckoutHeader';
import ProgressBar from '../../components/common/ProgressBar';
import PaymentForm from '../../components/CheckoutPayment/PaymentForm';
import OrderSummary from '../../components/common/OrderSummary';

const CheckoutPayment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'creditCard',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: 'same',
    rememberMe: false,
  });

  // Ensure shippingDetails is properly initialized
  const [shippingDetails] = useState({
    streetAddress: '123 Main Street', // Replace with dynamic data if available
    city: 'Springfield',
    postalCode: '12345',
    carrier: 'FedEx',
    shippingMethod: 'Express Delivery',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending payment data:', paymentDetails);
    navigate('/checkout-review');
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <CheckoutHeader navigate={navigate} />
      <ProgressBar />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="sm:col-span-2">
          <PaymentForm
            paymentDetails={paymentDetails}
            shippingDetails={shippingDetails} // Pass shippingDetails here
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPayment;