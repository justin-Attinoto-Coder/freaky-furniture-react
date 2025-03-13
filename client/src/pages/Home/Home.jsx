import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/home/Hero';
import NewsSection from '../../components/home/NewsSection';
import Accordion from '../../components/common/Accordion';
import SearchResults from '../../components/common/SearchResults';
import ProductCard from '../../components/common/ProductCard'; // Import ProductCard
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
      <div id="mobler" className="my-8">
        <h2 className="text-2xl font-bold mb-4">Möbler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moblerProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div id="forvaring" className="my-8">
        <h2 className="text-2xl font-bold mb-4">Förvaring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forvaringProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div id="detaljer" className="my-8">
        <h2 className="text-2xl font-bold mb-4">Detaljer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {detaljerProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div id="textil" className="my-8">
        <h2 className="text-2xl font-bold mb-4">Textil</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {textilProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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