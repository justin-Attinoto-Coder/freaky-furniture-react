import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyBasket from '../../components/Cart/MyBasket';

const Cart = () => {
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

  const handleCheckout = () => {
    navigate('/checkout-shipping');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <MyBasket cartItems={cartItems} />
      <div className="mt-4">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;