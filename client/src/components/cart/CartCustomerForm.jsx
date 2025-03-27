import PropTypes from 'prop-types';

const provinces = [
  "Stockholm", "Västra Götaland", "Skåne", "Uppsala", "Södermanland", "Östergötland", "Jönköping", "Kronoberg", "Kalmar", "Gotland", "Blekinge", "Halland", "Värmland", "Örebro", "Västmanland", "Dalarna", "Gävleborg", "Västernorrland", "Jämtland", "Västerbotten", "Norrbotten"
];

const cities = [
  "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Karlstad", "Täby", "Växjö", "Halmstad"
];

const CartCustomerForm = ({ formData, onChange, total }) => {
  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold mb-6">Customer Info</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Province Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Province</label>
        <select
          name="province"
          value={formData.province}
          onChange={onChange}
          className="w-full p-2 border rounded"
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

      {/* City Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">City</label>
        <select
          name="city"
          value={formData.city}
          onChange={onChange}
          className="w-full p-2 border rounded"
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
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Street Address</label>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Postal Code */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Total Price */}
      <div className="my-10">
        <p className="text-gray-700">
          Total inclusive moms: <span className="font-bold">${total.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

CartCustomerForm.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default CartCustomerForm;
