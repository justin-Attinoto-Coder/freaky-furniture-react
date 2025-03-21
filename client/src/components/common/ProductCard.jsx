import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card-container p-4 flex flex-col items-center w-full relative">
      <Link to={`/product/${product.urlSlug}`} className="w-full">
        <div className="image-container border border-gray-200 p-2 mb-4 rounded-lg relative">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
          <div className="absolute bottom-6 right-6">
            {isFavorite ? (
              <FaHeart
                className="text-2xl text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite();
                }}
              />
            ) : (
              <FaRegHeart
                className="text-2xl text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite();
                }}
              />
            )}
          </div>
        </div>
        <div className="product-info flex flex-col justify-between w-full">
          <div className="product-details">
            <h3 className="text-gray-500 text-sm truncate">{product.brand}</h3> {/* Add truncate class */}
            <p className="text-sm font-semibold truncate">{product.name}</p> {/* Add truncate class */}
          </div>
          <div className="product-price text-right absolute bottom-8 right-6">
            <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    urlSlug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;