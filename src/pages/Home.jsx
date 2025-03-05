import { useState } from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import Mobler from '../components/Mobler';
import Accordion from '../components/Accordion';
import SearchResults from '../components/SearchResults';
import PropTypes from 'prop-types';


const HomePage = ({searchResults}) => {

  return (
    <div>
      <h1>Welcome to Freaky Furniture</h1>
      <Hero />
      <SearchResults results={searchResults}/>
      <NewsSection />
      <Mobler />
      <Accordion />
      {/* Render search results here */}
    </div>
  );
};



HomePage.propTypes = {
  searchResults: PropTypes.array.
  isRequired,
};

export default HomePage;