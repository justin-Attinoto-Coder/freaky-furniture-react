import PropTypes from 'prop-types';
import ProductCard from '../Common/ProductCard';

const Forvaring = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No storage items available.</p>;
  }

  return (
    <section id="forvaring" className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Förvaring</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

Forvaring.propTypes = {
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

export default Forvaring;