import PropTypes from 'prop-types';
import AddToCartButton from '../cart/AddToCartButton';
import '../../../src/index.css'; // Import your CSS file

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

ProductInformation.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductInformation;