import PropTypes from 'prop-types';
import axios from 'axios';

const AddToCartButton = ({ product, quantity, className }) => {
  const handleAddToCart = () => {
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
    <button
      onClick={handleAddToCart}
      className={`px-4 py-3 bg-green-700 text-white rounded-lg border-2 border-black transition duration-300 ease-in-out hover:bg-green-800 ${className}`}
    >
      Lägg i varukorg
    </button>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    urlSlug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default AddToCartButton;