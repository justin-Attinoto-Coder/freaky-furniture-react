import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBasket from '../../components/cart/MyBasket';
import CartCustomerForm from '../../components/cart/CartCustomerForm';
import '../../../src/index.css'; // Import your CSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from global state, context, or local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout-shipping');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <MyBasket cartItems={cartItems} />
      <CartCustomerForm totalPrice={totalPrice} />
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
