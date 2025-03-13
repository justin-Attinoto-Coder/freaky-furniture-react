import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import CheckoutShipping from '../pages/Checkout/CheckoutShipping';
import CheckoutPayment from '../pages/Checkout/CheckoutPayment';
import CheckoutReview from '../pages/Checkout/CheckoutReview';
import CheckoutConfirmation from '../pages/Checkout/CheckoutConfirmation';
import AdminDashboard from '../pages/Admin/AdminDashboard';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const location = useLocation();
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
    navigate('/home', { state: { searchResults: results } });
  }, [furnitureItems, navigate]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header handleSearch={handleSearch} />}
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/home" element={<Home searchResults={searchResults} handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/product/:urlSlug" element={<ProductDetails furnitureItems={furnitureItems} addToCart={addToCart} />} />
        <Route path="/checkout-shipping" element={<CheckoutShipping />} />
        <Route path="/checkout-payment" element={<CheckoutPayment />} />
        <Route path="/checkout-review" element={<CheckoutReview />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}