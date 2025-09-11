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
      const url = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
      console.log(`ProductCard: Computed URL for ${product.name}: ${url}`);
      return url;
    }
    console.log(`ProductCard: No image for ${product.name}, using fallback`);
    return 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150';
  };

  const handleImageLoad = () => {
    console.log(`ProductCard: Image loaded for ${product.name}`);
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    console.log(`ProductCard: Image failed to load for ${product.name}, switching to fallback`);
    return 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150';
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
          onError={(e) => { e.target.src = handleImageError(); }}
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
