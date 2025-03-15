import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Common/ProductCard';

const CheckoutReview = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = () => {
    axios.get('http://localhost:8000/api/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 20; // Example shipping fee
  const subtotal = totalPrice + shippingFee;

  const handleConfirmOrder = () => {
    console.log('Confirm Order button clicked');
    // Clear the cart
    axios.delete('http://localhost:8000/api/cart/clear')
      .then(() => {
        console.log('Cart cleared');
        // Navigate to the confirmation page
        navigate('/checkout-confirmation');
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Fee:</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button onClick={handleConfirmOrder} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;