import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
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
      </Routes>
      {!isAdminRoute && <Footer />}
    </Router>
  );
}

export default App;
