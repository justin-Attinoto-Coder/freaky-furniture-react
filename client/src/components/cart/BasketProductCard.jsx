import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BasketProductCard = ({ item, updateCartItem, deleteCartItem }) => {
  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, item.quantity + amount);
    updateCartItem(item.urlSlug, newQuantity);
  };

  console.log('Item:', item); // Log the entire item object to the console

  return (
    <div className="relative flex justify-between items-center mb-4 border p-4 rounded">
      <Link to={`/product/${item.urlSlug}`} className="flex-grow">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mb-2" />
            <div className="flex items-center">
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full border border-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantityChange(-1);
                }}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full border border-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantityChange(1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-700">{item.brand}</p> {/* Company brand */}
            <p className="font-bold text-xl">{item.name}</p> {/* Product name */}
            <p className="text-gray-700">${item.price.toFixed(2)}</p> {/* Unit price */}
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteCartItem(item.urlSlug);
          }}
          className="absolute top-1 right-1 text-black"
        >
          X
        </button>
        <p className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</p> {/* Total price */}
      </div>
    </div>
  );
};

BasketProductCard.propTypes = {
  item: PropTypes.shape({
    urlSlug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, // Ensure image is included in the item prop
  }).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default BasketProductCard;