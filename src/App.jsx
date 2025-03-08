import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import { furnitureItems } from './components/Mobler';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const isAdminRoute = window.location.pathname.includes('admin');

  function handleSearch(query) {
    console.log(query, furnitureItems);
    const results = furnitureItems.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
  }

  console.log(searchResults);

  return (
    <Router>
      {!isAdminRoute && <Header handleSearch={handleSearch} />}
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} />} />
        <Route path="/cart" element={<Cart handleSearch={handleSearch} />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/admin/*" element={<Admin />} /> {/* Add this line */}
      </Routes>
      {!isAdminRoute && <Footer />}
    </Router>
  );
}

export default App;
