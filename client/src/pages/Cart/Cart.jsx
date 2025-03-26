import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyBasket from '../../components/Cart/MyBasket';
import CartCustomerForm from '../../components/Cart/CartCustomerForm';
import MaybeYouAlsoLike from '../../components/Cart/MaybeYouAlsoLike'; // Import the new component

const Cart = ({ cartItems, updateCartItem, deleteCartItem, recommendedItems }) => {
  const navigate = useNavigate();

  // Updated formData to match the backend schema
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: '',
  });

  const [error, setError] = useState(null); // State to handle errors
  const [success, setSuccess] = useState(false); // State to handle success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Ensure all fields are filled
    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isFormValid) {
      setError('Please fill out all fields.');
      return;
    }

    // Clear previous error and success states
    setError(null);
    setSuccess(false);

    console.log('Sending request to:', 'http://localhost:8000/api/customers');
    console.log('Request payload:', formData);

    fetch('http://localhost:8000/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send formData as the payload
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit customer details');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Customer details submitted successfully:', data);
        setSuccess(true); // Set success state
        alert('Customer details submitted successfully!'); // Optional success alert
        navigate('/checkout-shipping', {
          state: {
            customerDetails: formData,
            cartItems: cartItems,
            totalPrice: totalPrice,
          },
        }); // Navigate to /checkout-shipping with customer details
      })
      .catch((error) => {
        console.error('Error submitting customer details:', error);
        setError('Failed to submit customer details. Please try again.');
      });
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
      <div className="sm:flex sm:space-x-8">
        <div className="sm:w-1/2 flex flex-col justify-between">
          <form onSubmit={handleCheckout}>
            <div>
              <MyBasket
                cartItems={cartItems}
                updateCartItem={updateCartItem}
                deleteCartItem={deleteCartItem}
              />
              <CartCustomerForm
                formData={formData}
                onChange={handleChange}
                total={totalPrice}
              />
            </div>
            <div className="flex justify-between items-center mt-4 sm:mt-0">
              {/* Continue Shopping Button */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
                onClick={() => navigate('/')}
                type="button"
              >
                Continue Shopping
              </button>

              {/* Purchase Button */}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
                type="submit"
              >
                Purchase
              </button>
            </div>
          </form>
        </div>
        <div className="sm:w-1/2">
          <MaybeYouAlsoLike items={recommendedItems} />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-500 mt-4">Customer details submitted successfully!</p>}
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