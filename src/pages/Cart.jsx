import React from 'react';
import MyBasket from '../components/MyBasket';
import CartCustomerForm from '../components/CartCustomerForm';

const cartItems = [
  { id: 1, name: 'Furniture Item 1', price: 100, quantity: 2 },
  { id: 2, name: 'Furniture Item 2', price: 200, quantity: 1 },
  { id: 3, name: 'Furniture Item 3', price: 150, quantity: 3 },
];

const Cart = () => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <MyBasket cartItems={cartItems} />
      <CartCustomerForm totalPrice={totalPrice} />
    </div>
  );
};

export default Cart;