import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductDetailsImage from './FocusProductDetailsImage';
import FocusProductInformation from './FocusProductInformation';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FocusProductCard = ({ product, averageRating, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="focus-product-card-container p-4 flex flex-col sm:flex-row items-stretch w-full relative">
      <div className="image-container border border-gray-200 rounded-lg shadow-md p-2 mb-4 sm:mb-0 sm:mr-4 sm:w-2/5 lg:w-2/5 relative flex-shrink-0 sm:h-156">
        <ProductDetailsImage image={product.image} name={product.name} />
        <div className="absolute bottom-12 right-12">
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
      <div className="flex flex-col w-full sm:w-1/3 lg:w-1/3 mt-4 sm:mt-0 sm:absolute sm:top-0 sm:right-1/4 sm:h-full">
        <FocusProductInformation product={product} averageRating={averageRating} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

FocusProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlSlug: PropTypes.string.isRequired,
  }).isRequired,
  averageRating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default FocusProductCard;