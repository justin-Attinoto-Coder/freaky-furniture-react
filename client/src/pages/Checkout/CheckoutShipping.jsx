import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';
import { GoPackageDependents } from "react-icons/go";

const provinces = [
  "Stockholm", "Västra Götaland", "Skåne", "Uppsala", "Södermanland", "Östergötland", "Jönköping", "Kronoberg", "Kalmar", "Gotland", "Blekinge", "Halland", "Värmland", "Örebro", "Västmanland", "Dalarna", "Gävleborg", "Västernorrland", "Jämtland", "Västerbotten", "Norrbotten"
];

const cities = [
  "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Karlstad", "Täby", "Växjö", "Halmstad"
];

const CheckoutShipping = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access customer details, cart items, and total price passed from Cart.jsx
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
  });

  const [currentStep, setCurrentStep] = useState('shipping');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        setCurrentStep('payment');
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
        <FaArrowLeft
          className="text-xl cursor-pointer absolute left-4 text-blue-500"
          onClick={() => navigate('/cart')}
        />
        <h2 className="text-xl sm:text-2xl font-bold">Checkout</h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Left Column: Shipping Form */}
        <div className="sm:col-span-2">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8 mx-auto" style={{ maxWidth: '80%' }}>
            <div className="flex flex-col items-center">
              <GoPackageDependents
                className={`text-2xl ${
                  currentStep === 'shipping'
                    ? 'text-black border-2 border-black bg-white'
                    : 'text-gray-300'
                } p-2 rounded-full`}
              />
              <span className="text-sm font-bold">Shipping</span>
            </div>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <FaCreditCard className="text-2xl text-gray-300" />
              <span className="text-sm text-gray-300 font-bold">Payment</span>
            </div>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <FaClipboardCheck className="text-2xl text-gray-300" />
              <span className="text-sm text-gray-300 font-bold">Review</span>
            </div>
          </div>

          {/* Section Title */}
          <h3 className="text-xl sm:text-2xl text-center font-bold mb-4">Enter Shipping Details</h3>

          {/* Form Section */}
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
                      });
                    }
                  }}
                />
                <span className="ml-2 text-gray-700">Same as Customer Address</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Continue to Payment Method
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