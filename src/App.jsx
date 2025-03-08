import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/furniture')
      .then(response => response.json())
      .then(data => setFurnitureItems(data))
      .catch(error => console.error('Error fetching furniture items:', error));
  }, []);

  const handleSearch = useCallback((query) => {
    console.log(`Handling search for query: ${query}`);
    const results = furnitureItems.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
  }, [furnitureItems]);

  return (
    <Router>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/cart" element={<Cart handleSearch={handleSearch} />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
