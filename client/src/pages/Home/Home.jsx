import Hero from '../../components/Home/Hero';
import NewsSection from '../../components/Home/NewsSection';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Mobler from '../../components/Home/Mobler';
import Forvaring from '../../components/Home/Forvaring';
import Detaljer from '../../components/Home/Detaljer';
import Textil from '../../components/Home/Textil';

const Home = ({ furnitureItems }) => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the leading '#'
    if (hash) {
      const categoryElement = document.getElementById(hash);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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

  const recentProducts = getRandomProducts(filterRecentProducts(furnitureItems, 'recent'), 4);
  const moblerProducts = getRandomProducts(filterByCategory(furnitureItems, 'mobler'), 4);
  const forvaringProducts = getRandomProducts(filterByCategory(furnitureItems, 'forvaring'), 4);
  const detaljerProducts = getRandomProducts(filterByCategory(furnitureItems, 'detaljer'), 4);
  const textilProducts = getRandomProducts(filterByCategory(furnitureItems, 'textil'), 4);

  return (
    <div>
      <Hero />
      <NewsSection products={recentProducts} />
      <Mobler products={moblerProducts} />
      <Forvaring products={forvaringProducts} />
      <Detaljer products={detaljerProducts} />
      <Textil products={textilProducts} />
      <div id="mobler">
        <h2>Möbler</h2>
        {/* Möbler content */}
      </div>
      <div id="forvaring">
        <h2>Förvaring</h2>
        {/* Förvaring content */}
      </div>
      <div id="detaljer">
        <h2>Detaljer</h2>
        {/* Detaljer content */}
      </div>
      <div id="textil">
        <h2>Textil</h2>
        {/* Textil content */}
      </div>
    </div>
  );
};

Home.propTypes = {
  furnitureItems: PropTypes.array.isRequired,
};

export default Home;