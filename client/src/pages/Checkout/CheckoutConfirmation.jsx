import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 text-center">
      <img src="/path/to/positive-image.jpg" alt="Order Confirmation" className="mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Your order has been placed successfully</h2>
      <p className="mb-4">Thank you for choosing us! Feel free to continue shopping and explore our wide range of products. Happy Shopping!</p>
      <button onClick={handleContinueShopping} className="bg-blue-500 text-white px-4 py-2 rounded">
        Continue Shopping
      </button>
    </div>
  );
};

export default CheckoutConfirmation;