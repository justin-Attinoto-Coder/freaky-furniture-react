import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductUrlDetails from './pages/ProductUrlDetails';
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutPayment from './pages/CheckoutPayment';
import CheckoutReview from './pages/CheckoutReview';
import CheckoutConfirmation from './pages/CheckoutConfirmation';

function App() {
  const [searchResults, setSearchResults] = useState([]); // Added state for search results
  const [furnitureItems, setFurnitureItems] = useState([]); // Added state for furniture items
  const navigate = useNavigate(); // Added useNavigate hook

  useEffect(() => {
    fetch('http://localhost:8000/api/furniture')
      .then(response => response.json())
      .then(data => setFurnitureItems(data))
      .catch(error => console.error('Error fetching furniture items:', error));
  }, []);

  const handleSearch = useCallback((query) => {
    const results = furnitureItems.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
    navigate('/home', { state: { searchResults: results } }); // Redirect to the Home page with search results
  }, [furnitureItems, navigate]);

  return (
    <>
      <Header handleSearch={handleSearch} /> {/* Passed handleSearch to Header */}
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/cart" element={<Cart handleSearch={handleSearch} />} /> {/* Passed handleSearch to Cart */}
        <Route path="/product/:urlSlug" element={<ProductUrlDetails furnitureItems={furnitureItems} />} /> {/* Passed furnitureItems to ProductUrlDetails */}
        <Route path="/checkout-shipping" element={<CheckoutShipping />} />
        <Route path="/checkout-payment" element={<CheckoutPayment />} />
        <Route path="/checkout-review" element={<CheckoutReview />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
      </Routes>
      <Footer />
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
