import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyBasket from '../../components/Cart/MyBasket';
import CartCustomerForm from '../../components/Cart/CartCustomerForm';
import MaybeYouAlsoLike from '../../components/Cart/MaybeYouAlsoLike';

const addCustomerToDatabase = (customerData) => {
  return fetch('http://localhost:8000/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to add customer to the database');
    }
    return response.json();
  });
};

// Removed unused deleteCartItem function

const Cart = ({
  cartItems, // 🟢 Array of items currently in the cart
  // removeItemFromCart, // 🟢 Function to remove a single item from the cart
  recommendedItems, // 🟢 Array of recommended items to display
  // Removed unused updateCartItemQuantity prop
  // Removed unused clearCartAfterCheckout prop
}) => {
  const navigate = useNavigate();

  // 🟢 State to manage customer form data
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: '',
  });

  // 🟢 State to handle errors during checkout
  const [error, setError] = useState(null);

  // 🟢 State to handle success messages during checkout
  const [success, setSuccess] = useState(false);

  // 🟢 Function to handle changes in the customer form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // 🟢 Update the specific field in the form data
    }));
  };

  // 🟢 Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // 🟢 Function to handle the removal of an item from the cart
  const deleteCartItem = (itemId) => {
    console.log(`Removing item with ID: ${itemId}`); // Debug log
    // Add logic to remove the item from the cart
    // Example: Update the cartItems state or call a prop function
  };

  const updateCartItem = (productId, newQuantity) => {
    console.log(`Updating item with ID: ${productId} to quantity: ${newQuantity}`); // Debug log
    // Add logic to update the cart item quantity
    // Example: Update the cartItems state or call a prop function
  };

  // 🟢 Function to handle the checkout process
  const handleCheckout = (e) => {
    e.preventDefault();
    console.log('Purchase button clicked'); // Debug log

    // Validate that all form fields are filled
    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isFormValid) {
      setError('Please fill out all fields.'); // Show an error if validation fails
      return;
    }

    setError(null); // Clear any previous errors
    setSuccess(false); // Reset the success state

    // Add the customer to the database
    addCustomerToDatabase(formData)
      .then(() => {
        setSuccess(true); // Set success state after adding the customer

        // Navigate to the shipping page without clearing the cart
        navigate('/checkout-shipping', {
          state: {
            customerDetails: formData, // Pass customer details to the next page
            cartItems, // Pass the current cart items to the next page
            totalPrice, // Pass the total price to the next page
          },
        });
      })
      .catch((error) => {
        console.error('Error during checkout:', error); // Log the error
        setError('Failed to proceed to shipping. Please try again.'); // Show an error message
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
                cartItems={cartItems} // Pass the raw cart items array
                updateCartItem={updateCartItem} // Pass the update function
                deleteCartItem={deleteCartItem} // Pass the remove function
              />
              <CartCustomerForm
                formData={formData} // 🟢 Pass the customer form data
                onChange={handleChange} // 🟢 Pass the change handler
                total={totalPrice} // 🟢 Pass the total price
              />
            </div>
            <div className="flex justify-between items-center mt-4 sm:mt-0">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
                onClick={() => navigate('/')} // 🟢 Navigate back to the home page
                type="button"
              >
                Continue Shopping
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
                type="submit" // 🟢 Submit the checkout form
              >
                Purchase
              </button>
            </div>
          </form>
        </div>
        <div className="sm:w-1/2">
          <MaybeYouAlsoLike items={recommendedItems} /> {/* 🟢 Display recommended items */}
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>} {/* 🟢 Show error messages */}
      {success && <p className="text-green-500 mt-4">Customer details submitted successfully!</p>} {/* 🟢 Show success messages */}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  recommendedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      urlSlug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,  
  addCustomerToDatabase: PropTypes.func.isRequired,
};

export default Cart;