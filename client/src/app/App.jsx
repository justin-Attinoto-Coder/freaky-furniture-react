import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import CommonAccordion from '../components/Common/CommonAccordion';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import CheckoutShipping from '../pages/Checkout/CheckoutShipping';
import CheckoutPayment from '../pages/Checkout/CheckoutPayment';
import CheckoutReview from '../pages/Checkout/CheckoutReview';
import CheckoutConfirmation from '../pages/Checkout/CheckoutConfirmation';
import Search from '../pages/Search/Search';
import Admin from '../pages/Admin/AdminDashboard';
import AllReviews from '../pages/ProductDetails/AllReviews/AllReviews';
import Category from '../pages/Category/Category';
import axios from 'axios';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    axios.get('http://localhost:8000/api/cart')
      .then(response => {
        console.log('Cart items fetched:', response.data);
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  const updateCartItem = (urlSlug, quantity) => {
    axios.put(`http://localhost:8000/api/cart/${urlSlug}`, { quantity })
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error updating cart item:', error);
      });
  };

  const deleteCartItem = (urlSlug) => {
    axios.delete(`http://localhost:8000/api/cart/${urlSlug}`)
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error deleting cart item:', error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/furniture') // Ensure this URL is correct
      .then(response => response.json())
      .then(data => setFurnitureItems(data))
      .catch(error => console.error('Error fetching furniture items:', error));
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    const results = furnitureItems.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }, [furnitureItems, navigate]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header handleSearch={handleSearch} cartItems={cartItems} />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
          <Route path="/home" element={<Home handleSearch={handleSearch} furnitureItems={furnitureItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />} />
          <Route path="/product/:urlSlug" element={<ProductDetails furnitureItems={furnitureItems} addToCart={addToCart} />} />
          <Route path="/category/:category" element={<Category furnitureItems={furnitureItems} />} />
          <Route path="/checkout-shipping" element={<CheckoutShipping />} />
          <Route path="/checkout-payment" element={<CheckoutPayment />} />
          <Route path="/checkout-review" element={<CheckoutReview />} />
          <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
          <Route path="/search" element={<Search searchResults={searchResults} searchQuery={searchQuery} handleSearch={handleSearch} />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/reviews/:productId" element={<AllReviews />} />
        </Routes>
      </div>
      {!isAdminRoute && <CommonAccordion />} {/* Include the Accordion component above the Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}