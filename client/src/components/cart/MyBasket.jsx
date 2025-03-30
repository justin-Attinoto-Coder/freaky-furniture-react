import PropTypes from 'prop-types';
import BasketProductCard from './BasketProductCard';

const MyBasket = ({ cartItems, updateCartItem, deleteCartItem }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id || item.productId}> {/* Ensure the key is unique */}
              <BasketProductCard
                item={item}
                updateCartItem={updateCartItem}
                deleteCartItem={deleteCartItem}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MyBasket.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      brand: PropTypes.string,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default MyBasket;