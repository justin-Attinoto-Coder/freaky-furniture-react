import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react'; // Add useEffect and useCallback imports
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutPayment from './pages/CheckoutPayment';
import CheckoutReview from './pages/CheckoutReview';
import CheckoutConfirmation from './pages/CheckoutConfirmation';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const navigate = useNavigate();

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
    navigate('/home', { state: { searchResults: results } }); // Redirect to the Home page with search results
  }, [furnitureItems, navigate]);

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/cart" element={<Cart handleSearch={handleSearch} />} />
        <Route path="/product-details" element={<ProductDetails />} />
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
