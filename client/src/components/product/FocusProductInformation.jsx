import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FocusProductInformation = ({ title, brand, description, price, averageRating, onAddToCart }) => {
  return (
    <div className="product-information p-4 relative">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <h3 className="text-xl text-gray-700 mb-2">{brand}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-xl font-semibold mb-4">${price}</p>
      <div className="product-rating absolute top-5 right-2 flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-2xl">
            {index < averageRating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
          </span>
        ))}
      </div>
      <AddToCartButton onAddToCart={onAddToCart} />
    </div>
  );
};

FocusProductInformation.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default FocusProductInformation;