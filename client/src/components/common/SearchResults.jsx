import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import '../../../src/index.css'; // Import your CSS file


const SearchResults = ({ results, searchPerformed }) => {
  if (!searchPerformed) {
    return null;
  }

  if (results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <section className="p-8 mt-8 bg-gray-100">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
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