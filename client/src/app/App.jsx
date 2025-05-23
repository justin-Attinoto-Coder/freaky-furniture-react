import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import ProductDetails from '../pages/ProductDetails/ProductDetails'; // Updated import
import CheckoutShipping from '../pages/Checkout/CheckoutShipping';
import CheckoutPayment from '../pages/Checkout/CheckoutPayment';
import CheckoutReview from '../pages/Checkout/CheckoutReview';
import CheckoutConfirmation from '../pages/Checkout/CheckoutConfirmation';
import Search from '../pages/search/Search'; // Import Search
import Admin from '../pages/Admin/AdminDashboard'; // Import the Admin page
import '../../src/index.css'; // Import your CSS file

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const location = useLocation(); // Get the current route
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://freaky-furniture-react-server.onrender.com/api/furniture')
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

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return ( // Header/footer components will only be rendered if we're not on an admin route
    <>
      {!isAdminRoute && <Header handleSearch={handleSearch} />}
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
        <Route path="/admin/*" element={<Admin />} />
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
