import React from 'react';

const MyBasket = ({ cartItems }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span>{item.quantity} x ${item.price}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBasket;