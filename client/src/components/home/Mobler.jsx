import PropTypes from 'prop-types';
import ProductCard from '../Common/ProductCard';

const Mobler = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No furniture items available.</p>;
  }

  return (
    <section id="mobler" className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Möbler</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
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
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Mobler;