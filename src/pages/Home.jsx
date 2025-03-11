import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import Mobler from '../components/Mobler';
import Forvaring from '../components/Forvaring';
import Detaljer from '../components/Detaljer';
import Textil from '../components/Textil';
import Accordion from '../components/Accordion';
import SearchResults from '../components/SearchResults';
import PropTypes from 'prop-types';

const HomePage = ({ handleSearch, furnitureItems }) => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      // Perform search with searchQuery and update searchResults
      handleSearch(searchQuery);
      setSearchPerformed(true);
    } else if (location.state && location.state.searchResults) {
      setSearchResults(location.state.searchResults);
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  }, [location.search, location.state, handleSearch]);

  // Filter products to only include those with a publishing date within the past 7 days
  const filterRecentProducts = (products) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return products.filter(product => new Date(product.publishing_date) >= sevenDaysAgo);
  };

  // Filter products to only include those in the specified category
  const filterByCategory = (products, category) => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  };

  // Shuffle the array and limit to 4 products
  const getRandomProducts = (products, limit) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  };

  const recentProducts = getRandomProducts(filterRecentProducts(furnitureItems), 4);
  const moblerProducts = getRandomProducts(filterByCategory(furnitureItems, 'mobler'), 4);
  const forvaringProducts = getRandomProducts(filterByCategory(furnitureItems, 'forvaring'), 4);
  const detaljerProducts = getRandomProducts(filterByCategory(furnitureItems, 'detaljer'), 4);
  const textilProducts = getRandomProducts(filterByCategory(furnitureItems, 'textil'), 4);

  return (
    <div>
      <h1>Welcome to Freaky Furniture</h1>
      <Hero />
      {searchPerformed && <SearchResults results={searchResults} searchPerformed={searchPerformed} />}
      <NewsSection products={recentProducts} />
      <div id="mobler">
        <Mobler products={moblerProducts} />
      </div>
      <div id="forvaring">
        <Forvaring products={forvaringProducts} />
      </div>
      <div id="detaljer">
        <Detaljer products={detaljerProducts} />
      </div>
      <div id="textil">
        <Textil products={textilProducts} />
      </div>
      <Accordion />
    </div>
  );
};

HomePage.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  furnitureItems: PropTypes.array.isRequired,
};

export default HomePage;