import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CartCustomerForm = ({ onSubmit, total }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/customer', formData)
      .then(response => {
        console.log('Customer added:', response.data);
        onSubmit(formData);
      })
      .catch(error => {
        console.error('Error adding customer:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8"> {/* Adjusted margin */}
      <h2 className="text-center text-2xl font-bold mb-6">Customer Info</h2> {/* Added title */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Epost</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="my-10">
        <p className="text-gray-700">Total inclusive moms: <span className="font-bold">${total.toFixed(2)}</span></p>
      </div>
      <button type="submit" className="bg-green-500 text-white mb-20 px-4 py-3 rounded w-full sm:w-auto font-bold">
        Purchase
      </button>
    </form>
  );
};

CartCustomerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default CartCustomerForm;
