import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import Mobler from '../components/Mobler';
import Accordion from '../components/Accordion';
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';

const HomePage = ({ handleSearch }) => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      // Perform search with searchQuery and update searchResults
      fetchSearchResults(searchQuery).then(fetchedResults => {
        setResults(fetchedResults);
        setSearchPerformed(true);
      });
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  return (
    <div>
      <h1>Welcome to Freaky Furniture</h1>
      <Hero />
      <SearchResults results={results} searchPerformed={searchPerformed} />
      <NewsSection />
      <Mobler />
      <Accordion />
    </div>
  );
};

HomePage.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default HomePage;