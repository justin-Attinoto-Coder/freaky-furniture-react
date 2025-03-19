import PropTypes from 'prop-types';
import FocusProductDetailsImage from './FocusProductDetailsImage';
import FocusProductInformation from './FocusProductInformation';
import axios from 'axios';

const FocusProductCard = ({ product, averageRating }) => {
  const handleAddToCart = (quantity) => {
    axios.post('http://localhost:8000/api/cart', {
      urlSlug: product.urlSlug,
      name: product.name,
      price: product.price,
      quantity: quantity, // Use the selected quantity
    })
    .then(response => {
      console.log('Product added to cart:', response.data);
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  };

  return (
    <div className="focus-product-card-container p-4 flex flex-col items-center w-full relative">
      <div className="image-container border border-gray-200 rounded-lg shadow-md p-2 mb-4 relative">
        <FocusProductDetailsImage image={product.image} name={product.name} />
      </div>
      {/* Pass product and averageRating as props to FocusProductInformation */}
      <FocusProductInformation
        product={product}
        averageRating={averageRating}
        onAddToCart={handleAddToCart}
      />
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
};

export default FocusProductCard;