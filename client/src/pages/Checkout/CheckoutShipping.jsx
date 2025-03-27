import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const provinces = [
  "Stockholm", "Västra Götaland", "Skåne", "Uppsala", "Södermanland", "Östergötland", "Jönköping", "Kronoberg", "Kalmar", "Gotland", "Blekinge", "Halland", "Värmland", "Örebro", "Västmanland", "Dalarna", "Gävleborg", "Västernorrland", "Jämtland", "Västerbotten", "Norrbotten"
];

const cities = [
  "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Karlstad", "Täby", "Växjö", "Halmstad"
];

const CheckoutShipping = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const customerDetails = location.state?.customerDetails || {};
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phoneNumber: '',
    province: '',
    city: '',
    streetAddress: '',
    postalCode: '',
    shippingMethod: '',
    carrier: '',
    deliveryTime: '',
  });

  const carrierDeliveryTimes = {
    "DHL Express": "08:00-16:00",
    "EarlyBird": "02:20-06:00",
    "AirMe": "17:00-22:00",
    "DHL": "08:00-16:00",
    "Schenker Parcel": "08:00-16:00",
    "InstaBox": "08:00-16:00",
    "PostNord": "08:00-16:00",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };

      // Automatically set delivery time based on carrier
      if (name === "carrier") {
        updatedDetails.deliveryTime = carrierDeliveryTimes[value] || "";
      }

      return updatedDetails;
    });
  };

  const getCarrierOptions = () => {
    switch (shippingDetails.shippingMethod) {
      case 'Home Delivery':
        return ['AirMe', 'EarlyBird', 'PostNord'];
      case 'Pickup at Service Point':
        return ['DHL', 'Schenker Parcel', 'InstaBox'];
      case 'Express Shipping':
        return ['DHL Express', 'AirMe', 'EarlyBird'];
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const isFormValid = Object.values(shippingDetails).every((field) => field.trim() !== '');
    if (!isFormValid) {
      console.error('Form validation failed. Please fill out all fields.');
      return;
    }

    fetch('http://localhost:8000/api/shipping-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        navigate('/checkout-payment');
      })
      .catch((error) => {
        console.error('Error saving shipping details:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-4 relative">
        <div
          className="absolute left-4 flex items-center cursor-pointer text-blue-500"
          onClick={() => navigate('/cart')}
        >
          <FaArrowLeft className="text-xl" />
          <span className="hidden sm:inline-flex ml-2 text-lg font-medium">Return to Cart</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Checkout</h2>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 mx-auto" style={{ maxWidth: '80%' }}>
        {/* Shipping Step */}
        <div className="flex flex-col items-center">
          <FaBoxOpen
            className="text-2xl text-black border-2 border-black bg-white p-2 rounded-full"
          />
          <span className="text-sm font-bold">Shipping</span>
        </div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        {/* Payment Step */}
        <div className="flex flex-col items-center">
          <FaCreditCard className="text-2xl text-gray-300" />
          <span className="text-sm text-gray-300 font-bold">Payment</span>
        </div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        {/* Review Step */}
        <div className="flex flex-col items-center">
          <FaClipboardCheck className="text-2xl text-gray-300" />
          <span className="text-sm text-gray-300 font-bold">Review</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Left Column: Shipping Form */}
        <div className="sm:col-span-2">
          <h3 className="text-xl sm:text-2xl text-center font-bold mb-4">Enter Shipping Details</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-bold">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-bold">Phone Number *</label>
              <input
                type="text"
                name="phoneNumber"
                value={shippingDetails.phoneNumber}
                onChange={handleChange}
                placeholder="12-345 67 89"
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              />
            </div>

            {/* Province */}
            <div>
              <label className="block text-gray-700 font-bold">Province</label>
              <select
                name="province"
                value={shippingDetails.province}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-bold">City</label>
              <select
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-gray-700 font-bold">Street Address *</label>
              <input
                type="text"
                name="streetAddress"
                value={shippingDetails.streetAddress}
                onChange={handleChange}
                placeholder="Enter your street address"
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-gray-700 font-bold">Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              />
            </div>

            {/* Shipping Method */}
            <div>
              <label className="block text-gray-700 font-bold">Shipping Method *</label>
              <select
                name="shippingMethod"
                value={shippingDetails.shippingMethod}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
              >
                <option value="">Select Shipping Method</option>
                <option value="Home Delivery">Home Delivery</option>
                <option value="Pickup at Service Point">Pickup at Service Point</option>
                <option value="Express Shipping">Express Shipping</option>
              </select>
            </div>

            {/* Carrier */}
            <div>
              <label className="block text-gray-700 font-bold">Carrier *</label>
              <select
                name="carrier"
                value={shippingDetails.carrier}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded-xl"
                required
                disabled={!shippingDetails.shippingMethod} // Disable if no shipping method is selected
              >
                <option value="">Select Carrier</option>
                {getCarrierOptions().map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-gray-700 font-bold">Delivery Time *</label>
              <input
                type="text"
                name="deliveryTime"
                value={shippingDetails.deliveryTime}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-xl"
              />
            </div>

            {/* Checkbox for Same Address */}
            <div className="col-span-1 sm:col-span-2 mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShippingDetails({
                        fullName: customerDetails.fullName || '',
                        phoneNumber: customerDetails.phoneNumber || '',
                        province: customerDetails.province || '',
                        city: customerDetails.city || '',
                        streetAddress: customerDetails.streetAddress || '',
                        postalCode: customerDetails.postalCode || '',
                        shippingMethod: '',
                        carrier: '',
                        deliveryTime: '',
                      });
                    }
                  }}
                />
                <span className="ml-2 text-gray-700">Same as Customer Address</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 flex sm:ml-auto">
              <button
                type="submit"
                className="mt-8 mb-8 w-md mx-auto sm:w-auto bg-black sm:bg-blue-500 text-white px-4 py-2 rounded-full sm:rounded sm:font-bold sm:text-lg"
              >
                {/* Mobile Text */}
                <span className="block sm:hidden">Confirm</span>
                {/* Desktop Text */}
                <span className="hidden sm:block">Continue to Payment Method</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="hidden sm:block bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </li>
          </ul>

          {/* Discount Code Form */}
          <div className="mt-6">
            <label className="block text-gray-700 font-bold mb-2">Discount Code</label>
            <input
              type="text"
              placeholder="Enter discount code"
              className="w-full p-2 border rounded"
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full">
              Apply
            </button>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-8">
            <label className="block text-gray-700 font-bold mb-2">Subscribe to Newsletter</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-2 border rounded"
            />
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShipping;