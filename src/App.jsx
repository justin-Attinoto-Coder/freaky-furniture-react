import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
<<<<<<< HEAD
import ProductDetails from './pages/productdetails';
import Admin from './pages/Admin';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/*" element={<Admin />} />
=======
import ProductDetails from './pages/ProductDetails';
import { furnitureItems } from './components/Mobler';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);

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
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} />} />
        <Route path="/cart" element={<Cart handleSearch={handleSearch} />} />
        <Route path="/product-details" element={<ProductDetails />} />
>>>>>>> f8acd3aa64613b910d94fa768edda8f11842e455
      </Routes>
      {!isAdminRoute && <Footer />}
    </Router>
  );
}

export default App;
