import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../src/index.css';

const ProductCard = ({ product }) => {
  const baseUrl = 'https://freaky-furniture-react-server.onrender.com';
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getImageUrl = () => {
    const imagePath = product.image?.trim();
    if (imagePath) {
      let normalizedPath = imagePath;
      if (imagePath.startsWith('http://localhost:8000')) {
        normalizedPath = imagePath.replace('http://localhost:8000', baseUrl);
      }
      if (!normalizedPath.startsWith('http') && !normalizedPath.startsWith('/')) {
        normalizedPath = `/images/${normalizedPath.replace(/^images\//, '')}`;
      } else if (!normalizedPath.startsWith('http') && normalizedPath.startsWith('/')) {
        normalizedPath = normalizedPath.replace(/^\/+images\//, '/images/');
      }
      return normalizedPath.startsWith('http') ? normalizedPath : `${baseUrl}${normalizedPath}`;
    }
    return 'https://via.placeholder.com/150?text=No+Image';
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/150?text=No+Image';
    event.target.onerror = null; // Prevent infinite error loop
    setIsImageLoaded(true);
  };

  return (
    <div className="product-card border border-gray-200 p-4 rounded-lg shadow-sm">
      <Link to={`/product/${product.urlSlug}`}>
        {!isImageLoaded && (
          <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        )}
        <img
          src={getImageUrl()}
          alt={product.name}
          className={`h-48 w-full object-cover mb-4 rounded-lg ${isImageLoaded ? '' : 'hidden'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    urlSlug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
