import PropTypes from 'prop-types';
import ProductCard from '../Common/ProductCard';

const SimilarProducts = ({ similarItems }) => {
  return (
    <section className="similar-products p-8 mt-8 sm:mt-28">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Liknande Produkter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {similarItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

SimilarProducts.propTypes = {
  similarItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SimilarProducts;