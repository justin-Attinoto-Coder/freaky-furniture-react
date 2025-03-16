import PropTypes from 'prop-types';

const MyBasket = ({ cartItems, updateCartItem, deleteCartItem }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 mr-2"
                  min="1"
                />
                <button onClick={() => deleteCartItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Remove
                </button>
              </div>
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