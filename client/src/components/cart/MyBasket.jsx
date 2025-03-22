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
            <li key={item.urlSlug}>
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
  cartItems: PropTypes.array.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default MyBasket;