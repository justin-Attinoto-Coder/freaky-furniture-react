import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center w-full sm:w-1/4 sm:absolute sm:right-30 sm:top-2">
      <div className="relative w-full sm:w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-500" />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;