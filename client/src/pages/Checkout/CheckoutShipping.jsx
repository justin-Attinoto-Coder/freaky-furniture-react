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
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-center mb-4">
        <FaArrowLeft className="text-xl cursor-pointer absolute left-4" onClick={() => navigate('/cart')} />
        <h2 className="text-xl font-bold">Checkout</h2>
      </div>
      <div className="flex items-center justify-between mb-8 mx-15" style={{ width: '80%' }}>
        <div className="flex flex-col items-center">
          <FaBoxOpen className={`text-2xl ${currentStep === 'shipping' ? 'text-black border-2 border-black' : 'text-white bg-black'} p-2 rounded-full`} />
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mx-15 mb-2">Shipping Method</label>
          <select value={shippingMethod} onChange={handleShippingMethodChange} className="w-md mx-15 p-2 bg-gray-100 rounded-xl">
            <option value="homeDelivery">Home Delivery (08:00-16:00)</option>
            <option value="servicePoint">Pick-up at Service Point</option>
            <option value="expressDelivery">Express Delivery</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mx-15 mb-2">Carrier</label>
          <select value={carrier} onChange={handleCarrierChange} className="w-md mx-15 p-2 bg-gray-100 rounded-xl">
            <option value="postnord">PostNord</option>
            <option value="dhl">DHL</option>
            <option value="dhlExpress">DHL Express</option>
            <option value="earlyBird">EarlyBird (02:20-06:00)</option>
            <option value="airMe">AirMe (17:00-22:00)</option>
            <option value="dbSchenker">DB Schenker</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mx-15 mb-2">Delivery Time</label>
          <select value={deliveryTime} onChange={handleDeliveryTimeChange} className="w-md mx-15 p-2 bg-gray-100 rounded-xl">
            <option value="08:00-16:00">08:00 - 16:00</option>
            <option value="16:00-20:00">16:00 - 20:00</option>
            <option value="20:00-22:00">20:00 - 22:00</option>
          </select>
        </div>
        <button type="submit" className="mx-15 mt-10 bg-black text-white px-4 py-4 font-bold rounded-full w-md mb-14">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CheckoutShipping;