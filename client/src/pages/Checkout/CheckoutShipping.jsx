import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutShipping = () => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: '',
  });

  const [shippingMethod, setShippingMethod] = useState('homeDelivery');
  const [carrier, setCarrier] = useState('postnord');
  const [deliveryTime, setDeliveryTime] = useState('08:00-16:00');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const handleCarrierChange = (event) => {
    setCarrier(event.target.value);
  };

  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping details to state or context
    navigate('/checkout-payment');
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Shipping Method</label>
          <select value={shippingMethod} onChange={handleShippingMethodChange} className="w-full p-2 border rounded">
            <option value="homeDelivery">Home Delivery</option>
            <option value="servicePoint">Pick-up at Service Point</option>
            <option value="expressDelivery">Express Delivery</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Carrier</label>
          <select value={carrier} onChange={handleCarrierChange} className="w-full p-2 border rounded">
            <option value="postnord">PostNord</option>
            <option value="dhl">DHL</option>
            <option value="dhlExpress">DHL Express</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Delivery Time</label>
          <select value={deliveryTime} onChange={handleDeliveryTimeChange} className="w-full p-2 border rounded">
            <option value="08:00-16:00">08:00 - 16:00</option>
            <option value="16:00-20:00">16:00 - 20:00</option>
            <option value="20:00-22:00">20:00 - 22:00</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutShipping;