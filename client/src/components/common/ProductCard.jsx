import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../src/index.css'; // Import your CSS file


const ProductCard = ({ product }) => {
  return (
    <div className="product-card border border-gray-200 p-4 rounded-lg shadow-sm">
      <Link to={`/product/${product.urlSlug}`}>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4 rounded-lg" />
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