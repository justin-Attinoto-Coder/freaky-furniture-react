import PropTypes from 'prop-types';

const CartCustomerForm = ({ totalPrice, handleChange, shippingDetails }) => {
  return (
    <div className="p-8 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={shippingDetails.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={shippingDetails.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Province</label>
        <input
          type="text"
          name="province"
          value={shippingDetails.province}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={shippingDetails.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Street Address</label>
        <input
          type="text"
          name="streetAddress"
          value={shippingDetails.streetAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={shippingDetails.postalCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mt-4">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

CartCustomerForm.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  shippingDetails: PropTypes.object.isRequired,
};

export default CartCustomerForm;