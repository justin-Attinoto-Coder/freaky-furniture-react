import PropTypes from 'prop-types';
import axios from 'axios';

const AddToCartButton = ({ product, quantity }) => {
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
      className="absolute right-0 top-1/3 w-2/3 sm:w-full px-4 py-3 bg-green-700 text-white rounded-lg border-2 border-black transition duration-300 ease-in-out hover:bg-green-800 on-click:bg-green-900"
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
};

export default AddToCartButton;