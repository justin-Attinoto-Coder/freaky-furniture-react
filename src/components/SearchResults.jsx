import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const NO_RESULTS_MESSAGE = 'No results found';  // Define a constant for the message to display when there are no search results

const SearchResults = ({ results, searchPerformed }) => {
  if (!searchPerformed) {
    return null;
  }

  if (results.length === 0) {
    return <div>{NO_RESULTS_MESSAGE}</div>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
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
    })
  ).isRequired,
  searchPerformed: PropTypes.bool.isRequired,
};

export default SearchResults;