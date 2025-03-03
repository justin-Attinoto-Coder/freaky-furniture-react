import React from 'react';
import AddToCartButton from './AddToCartButton';

const ProductInformation = ({ title, brand, description, price, onAddToCart }) => {
  return (
    <div className="product-information p-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <h3 className="text-xl text-gray-700 mb-2">{brand}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-xl font-semibold mb-4">${price}</p>
      <AddToCartButton onAddToCart={onAddToCart} />
    </div>
  );
};

export default ProductInformation;