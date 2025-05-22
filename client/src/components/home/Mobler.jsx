import PropTypes from 'prop-types';

const Mobler = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No furniture items available.</p>;
  }

  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Furniture Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Mobler.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Mobler;