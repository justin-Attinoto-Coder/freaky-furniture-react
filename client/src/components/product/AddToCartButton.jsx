import axios from 'axios';
import PropTypes from 'prop-types';

const AddToCartButton = ({ product, quantity, onAddToCart }) => {
  const handleAddToCart = () => {
    axios.post('http://localhost:8000/api/cart', {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageURL: product.image,
      brand: product.brand,
    })
      .then(response => {
        console.log('Product added to cart:', response.data);
        onAddToCart(product);
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
      Add to Cart
    </button>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default AddToCartButton;