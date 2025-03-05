import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleClick = () => {
    handleSearch(query);
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input className="px-0.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search for furniture..." 
      />
      <button className="px-0.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleClick}>Search</button>
    </div>
  );
};

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    };

export default SearchBar;