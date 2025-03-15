import PropTypes from 'prop-types';

const AddToCartButton = ({ onAddToCart }) => {
  return (
    <button 
      onClick={onAddToCart} 
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Lägg i varukorg
    </button>
  );
};

AddToCartButton.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default AddToCartButton;