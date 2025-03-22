import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecommendedProductCard = ({ item }) => {
  return (
    <Link to={`/product/${item.urlSlug}`} className="block mb-4">
      <div className="border p-4 rounded">
        <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-gray-700">{item.brand}</p>
        <p className="text-gray-700">${item.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

RecommendedProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlSlug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendedProductCard;