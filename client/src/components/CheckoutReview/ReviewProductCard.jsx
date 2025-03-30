import PropTypes from 'prop-types';

const ReviewProductCard = ({ product, handleQuantityChange }) => {
  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg p-4 mb-6 mx-auto w-3/4">
      {/* Thumbnail */}
      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md" />

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="italic text-gray-500">Limited Stock</p>
        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
      </div>

      {/* Quantity Editor */}
      <div className="flex items-center">
        <button
          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="mx-2">{product.quantity}</span>
        <button
          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

ReviewProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default ReviewProductCard;