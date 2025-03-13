import PropTypes from 'prop-types';
import SearchResults from '../../components/common/SearchResults';

const SearchPage = ({ searchResults }) => {
  return (
    <section className="p-8 mt-8 bg-gray-100">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-4">Search Results</h2>
        <SearchResults results={searchResults} searchPerformed={true} />
      </div>
    </section>
  );
};

SearchPage.propTypes = {
  searchResults: PropTypes.arrayOf(
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

export default SearchPage;