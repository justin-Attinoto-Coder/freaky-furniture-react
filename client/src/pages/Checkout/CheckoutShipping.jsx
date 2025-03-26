import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const provinces = [
  "Stockholm", "Västra Götaland", "Skåne", "Uppsala", "Södermanland", "Östergötland", "Jönköping", "Kronoberg", "Kalmar", "Gotland", "Blekinge", "Halland", "Värmland", "Örebro", "Västmanland", "Dalarna", "Gävleborg", "Västernorrland", "Jämtland", "Västerbotten", "Norrbotten"
];

const cities = [
  "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Karlstad", "Täby", "Växjö", "Halmstad"
];

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
  const [currentStep, setCurrentStep] = useState('shipping');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove spaces
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      phoneNumber: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting shipping details:', {
      ...shippingDetails,
      shippingMethod,
      carrier,
      deliveryTime
    });

    fetch('http://localhost:8000/api/shipping-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...shippingDetails,
        shippingMethod,
        carrier,
        deliveryTime
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCurrentStep('payment');
        navigate('/checkout-payment');
      })
      .catch(error => {
        console.error('Error saving shipping details:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Mobile Version */}
      <div className="sm:hidden">
        <div className="flex items-center justify-center mb-4">
          <FaArrowLeft className="text-xl cursor-pointer absolute left-4" onClick={() => navigate('/cart')} />
          <h2 className="text-xl font-bold">Checkout</h2>
        </div>
        <div className="flex items-center justify-between mb-8 mx-15" style={{ width: '80%' }}>
          <div className="flex flex-col items-center">
            <FaBoxOpen className={`text-2xl ${currentStep === 'shipping' ? 'text-black border-2 border-black bg-white' : 'text-white bg-black'} p-2 rounded-full`} />
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
        <h3 className="text-xl text-center font-bold mx-15 mb-4">Enter Shipping Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-md p-2 bg-gray-100 mx-15 rounded-xl"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">Phone Number *</label>
            <div className="flex items-center mx-15">
              <span className="p-2 bg-gray-100 rounded-l-xl text-gray-500">+46</span>
              <input
                type="text"
                name="phoneNumber"
                value={shippingDetails.phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="12-345 67 89"
                className="w-full p-2 bg-gray-100 rounded-r-xl"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">Province</label>
            <select
              name="province"
              value={shippingDetails.province}
              onChange={handleChange}
              className="w-md mx-15 p-2 bg-gray-100 rounded-xl"
              required
            >
              <option value="">Select Province</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">City</label>
            <select
              name="city"
              value={shippingDetails.city}
              onChange={handleChange}
              className="w-md mx-15 p-2 bg-gray-100 rounded-xl"
              required
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">Street Address *</label>
            <input
              type="text"
              name="streetAddress"
              value={shippingDetails.streetAddress}
              onChange={handleChange}
              placeholder="Enter your street address"
              className="w-md mx-15 p-2 bg-gray-100 rounded-xl"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mx-15">Postal Code *</label>
            <input
              type="text"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleChange}
              placeholder="Enter your postal code"
              className="w-md mx-15 p-2 bg-gray-100 rounded-xl"
              required
            />
          </div>
          <button type="submit" className="mx-15 mt-10 bg-black text-white px-4 py-4 font-bold rounded-full w-md mb-14">
            Confirm
          </button>
        </form>
      </div>

      {/* Desktop Version */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <FaBoxOpen className={`text-2xl ${currentStep === 'shipping' ? 'text-black border-2 border-black bg-white' : 'text-gray-300'} p-2 rounded-full`} />
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
        <div className="sm:flex sm:space-x-8">
          {/* Left Column */}
          <div className="sm:w-2/3 relative">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaArrowLeft
                  className="text-xl cursor-pointer text-blue-500"
                  onClick={() => navigate('/cart')}
                />
                <span
                  className="ml-2 text-blue-500 cursor-pointer underline"
                  onClick={() => navigate('/cart')}
                >
                  Return to cart
                </span>
              </div>
            </div>
            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    onChange={handlePhoneNumberChange}
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
              </div>

              {/* Checkbox for Same Address */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Logic to copy customer address from cart
                        setShippingDetails({
                          fullName: 'John Doe', // Replace with actual customer data
                          phoneNumber: '123456789',
                          province: 'Stockholm',
                          city: 'Stockholm',
                          streetAddress: '123 Main St',
                          postalCode: '12345',
                        });
                      }
                    }}
                  />
                  <span className="ml-2 text-gray-700">Same as Customer Address</span>
                </label>
              </div>
              {/* Continue to Payment Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-8 bg-blue-500 text-white px-4 py-2 rounded w-xs ml-auto"
                >
                  Continue to Payment Method
                </button>
              </div>
            </form>
          </div>
          {/* Right Column */}
          <div className="hidden sm:block sm:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%):</span>
                <span>$5.50</span>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="Enter discount code"
                className="w-full p-2 border rounded"
              />
              <button className="ml-2 bg-gray-300 text-black px-4 py-2 rounded">
                Apply
              </button>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>$115.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShipping;