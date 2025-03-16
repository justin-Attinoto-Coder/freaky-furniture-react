import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyBasket from '../../components/Cart/MyBasket';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Ensure initial state is an empty array
  const navigate = useNavigate();

  const fetchCartItems = () => {
    axios.get('http://localhost:8000/api/cart')
      .then(response => {
        console.log('Cart items fetched:', response.data);
        // Aggregate items with the same urlSlug
        const aggregatedItems = response.data.reduce((acc, item) => {
          const existingItem = acc.find(i => i.urlSlug === item.urlSlug);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);
        setCartItems(aggregatedItems);
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

  const handleCheckout = () => {
    navigate('/checkout-shipping');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <MyBasket
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
      />
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