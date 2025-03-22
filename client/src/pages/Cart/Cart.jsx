import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyBasket from '../../components/Cart/MyBasket';
import CartCustomerForm from '../../components/Cart/CartCustomerForm';
import MaybeYouAlsoLike from '../../components/Cart/MaybeYouAlsoLike'; // Import the new component

const Cart = ({ cartItems, updateCartItem, deleteCartItem, recommendedItems }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = (formData) => {
    console.log('Customer details:', formData);
    navigate('/checkout-shipping');
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
      <div className="sm:flex sm:space-x-8">
        <div className="sm:w-1/2">
          <MyBasket
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
          />
          <CartCustomerForm onSubmit={handleCheckout} total={totalPrice} />
        </div>
        <div className="sm:w-1/2">
          <MaybeYouAlsoLike items={recommendedItems} />
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  recommendedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      urlSlug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cart;