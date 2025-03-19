import PropTypes from 'prop-types';
import ProductDetailsImage from './FocusProductDetailsImage';
import FocusProductInformation from './FocusProductInformation';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FocusProductCard = ({ product, averageRating, onAddToCart }) => {
  return (
    <div className="focus-product-card-container p-4 flex flex-col items-center w-full relative">
      <div className="image-container border border-gray-200 rounded-lg shadow-md p-2 mb-4 relative">
        <ProductDetailsImage image={product.image} name={product.name} />
        <div className="product-rating absolute -bottom-19 right-2 flex items-center">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-2xl">
              {index < averageRating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
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