import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MyBasket from '../../components/Cart/MyBasket';
import CartCustomerForm from '../../components/Cart/CartCustomerForm';

const Cart = ({ cartItems, updateCartItem, deleteCartItem }) => {
  const navigate = useNavigate();

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

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default Cart;