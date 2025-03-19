import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AddToCartButton from './AddToCartButton';
import OverviewAccordion from './OverviewAccordion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';

const FocusProductInformation = ({ product, averageRating, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/reviews/${product.id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [product.id]);

  return (
    <div className="product-information p-4 relative">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <h3 className="text-xl text-gray-700 mb-2">{product.brand}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <div className="product-rating absolute top-5 right-2 flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-2xl">
            {index < averageRating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
          </span>
        ))}
      </div>
      <div className="quantity-selector flex items-center mb-4 relative">
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full border border-gray-400"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full border border-gray-400"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <div className="flex-grow ml-4">
          <AddToCartButton product={product} quantity={quantity} onAddToCart={onAddToCart} />
        </div>
      </div>
      {/* Add OverviewAccordion component */}
      <OverviewAccordion product={product} reviews={reviews} />
    </div>
  );
};

FocusProductInformation.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlSlug: PropTypes.string.isRequired,
    size: PropTypes.string,
    weight: PropTypes.string,
    specifications: PropTypes.string,
  }).isRequired,
  averageRating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default FocusProductInformation;