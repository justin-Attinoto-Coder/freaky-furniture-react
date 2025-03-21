import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyBasket from '../../components/Cart/MyBasket';
import CartCustomerForm from '../../components/Cart/CartCustomerForm';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = () => {
    axios.get('http://localhost:8000/api/cart')
      .then(response => {
        console.log('Cart items fetched:', response.data);
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  const updateCartItem = (urlSlug, quantity) => {
    axios.put(`http://localhost:8000/api/cart/${urlSlug}`, { quantity })
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error updating cart item:', error);
      });
  };

  const deleteCartItem = (urlSlug) => {
    axios.delete(`http://localhost:8000/api/cart/${urlSlug}`)
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error deleting cart item:', error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = (formData) => {
    console.log('Customer details:', formData);
    navigate('/checkout-shipping');
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
      <MyBasket
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      />
      <div className="mt-4">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <CartCustomerForm onSubmit={handleCheckout} total={totalPrice} />
    </div>
  );
};

export default Cart;