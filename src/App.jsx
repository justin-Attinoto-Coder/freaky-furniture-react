import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutPayment from './pages/CheckoutPayment';
import CheckoutReview from './pages/CheckoutReview';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
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
        <Route path="/checkout-shipping" element={<CheckoutShipping />} />
        <Route path="/checkout-payment" element={<CheckoutPayment />} />
        <Route path="/checkout-review" element={<CheckoutReview />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
