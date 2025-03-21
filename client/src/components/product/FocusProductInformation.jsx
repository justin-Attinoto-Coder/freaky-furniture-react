import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AddToCartButton from './AddToCartButton';
import FocusOverviewAccordion from './FocusOverviewAccordion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div className="product-rating flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-2xl">
            {index < averageRating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
          </span>
        ))}
      </div>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="quantity-selector flex items-center mb-4">
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
      </div>
      <AddToCartButton product={product} quantity={quantity} onAddToCart={onAddToCart} />
      <Link to={`/reviews/${product.id}`} className="text-blue-500 underline mt-4 block sm:absolute sm:-right-1 sm:-top-42">
        See all reviews
      </Link>
      <FocusOverviewAccordion product={product} reviews={reviews} />
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
    dimensions: PropTypes.string,
    weight: PropTypes.string,
    material: PropTypes.string,
    specifications: PropTypes.string,
  }).isRequired,
  averageRating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default FocusProductInformation;