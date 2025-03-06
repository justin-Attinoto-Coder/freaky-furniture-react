import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyBasket from '../components/MyBasket';
import CartCustomerForm from '../components/CartCustomerForm';

const cartItems = [
  { id: 1, name: 'Furniture Item 1', price: 100, quantity: 2 },
  { id: 2, name: 'Furniture Item 2', price: 200, quantity: 1 },
  { id: 3, name: 'Furniture Item 3', price: 150, quantity: 3 },
];

const Cart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCartSearch = (e) => {
    e.preventDefault();
    history.push(`/home?search=${searchQuery}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <form onSubmit={handleCartSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for items"
          className="border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
      </form>
      <MyBasket cartItems={cartItems} />
      <CartCustomerForm totalPrice={totalPrice} />
    </div>
  );
};

export default Cart;