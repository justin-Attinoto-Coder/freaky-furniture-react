import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails'; // Updated import
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutPayment from './pages/CheckoutPayment';
import CheckoutReview from './pages/CheckoutReview';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import Search from './pages/Search'; // Import Search

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Added state for cart items
  const navigate = useNavigate();

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
    navigate(`/search?q=${encodeURIComponent(query)}`); // Redirect to the SearchPage with search query in URL
  }, [furnitureItems, navigate]);

  const addToCart = (product) => {
    setCartItems(prevCartItems => [...prevCartItems, product]);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/home" element={<Home handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* Passed cartItems to Cart */}
        <Route path="/product/:urlSlug" element={<ProductDetails furnitureItems={furnitureItems} addToCart={addToCart} />} /> {/* Passed addToCart to ProductDetails */}
        <Route path="/checkout-shipping" element={<CheckoutShipping />} />
        <Route path="/checkout-payment" element={<CheckoutPayment />} />
        <Route path="/checkout-review" element={<CheckoutReview />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
        <Route path="/search" element={<Search searchResults={searchResults} />} /> {/* Added Search route */}
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
