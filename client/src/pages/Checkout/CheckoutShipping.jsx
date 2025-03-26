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
    console.log('Submitting shipping details:', {
      ...shippingDetails,
      shippingMethod,
      carrier,
      deliveryTime
    }); // Log the request payload

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
        console.log('Server response:', response); // Log the raw response
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Shipping details saved:', data); // Log the response data
        setCurrentStep('payment');
        navigate('/checkout-payment');
      })
      .catch(error => {
        console.error('Error saving shipping details:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-4 relative">
      <div className="sm:flex sm:space-x-8">
        {/* Left Column */}
        <div className="sm:w-2/3 relative">
          {/* Top Section with Icons and Back Arrow */}
          <div className="flex items-center justify-between mb-4">
            {/* Back Arrow */}
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

            {/* React Icons */}
            <div className="flex space-x-4">
              <FaBoxOpen className="text-2xl text-gray-600" />
              <FaCreditCard className="text-2xl text-gray-600" />
              <FaClipboardCheck className="text-2xl text-gray-600" />
            </div>
          </div>

          {/* Shipping Form */}
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
            <button
              type="submit"
              className="mt-8 bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Continue to Payment Method
            </button>
          </form>
        </div>

        {/* Right Column (Order Summary) */}
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
  );
};

export default CheckoutShipping;