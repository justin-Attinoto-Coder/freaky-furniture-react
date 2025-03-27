import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckoutReviewProgressBar from '../../components/CheckoutReview/CheckoutReviewProgressBar';
import ReviewProductCard from '../../components/CheckoutReview/ReviewProductCard';
import OrderSummary from '../../components/CheckoutReview/OrderSummary';

const CheckoutReview = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod] = useState('home'); // Default shipping method
  const navigate = useNavigate();

  // Fetch cart items from the API
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

  // Calculate subtotal and total prices
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee =
    shippingMethod === 'home' ? 10 : shippingMethod === 'servicePoint' ? 0 : 25;
  const grandTotal = subtotal + shippingFee;

  // Handle quantity changes for products
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  // Handle order confirmation
  const handleConfirmOrder = () => {
    console.log('Confirm Order button clicked');
    axios.delete('http://localhost:8000/api/cart/clear')
      .then(() => {
        console.log('Cart cleared');
        navigate('/checkout-confirmation');
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 pb-40"> {/* Increased bottom padding */}
      {/* Progress Bar */}
      <CheckoutReviewProgressBar />

      {/* Review Product Cards */}
      <div className="mt-4 mb-24"> {/* Added bottom margin to avoid overlap with OrderSummary */}
        {cartItems.map((item) => (
          <ReviewProductCard
            key={item.id}
            product={item}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      {/* Order Summary */}
      <OrderSummary
        subtotal={subtotal}
        shippingFee={shippingFee}
        grandTotal={grandTotal}
        handleConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
};

export default CheckoutReview;