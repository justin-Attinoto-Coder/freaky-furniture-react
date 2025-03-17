import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const SearchResults = ({ results = [], searchPerformed }) => {
  if (!searchPerformed) {
    return null;
  }

  if (results.length === 0) {
    return <p className="px-8 text-5xl font-bold">No results found</p>;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchPerformed: PropTypes.bool.isRequired,
};

export default SearchResults;