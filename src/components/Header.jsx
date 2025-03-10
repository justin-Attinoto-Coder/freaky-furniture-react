import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBars, FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import Navbar from './Navbar';

const Header = ({ handleSearch }) => {
  return (
    <header className="flex justify-between items-center px-6 bg-gray-100 shadow-md">
      <div className="flex items-center">
        <FaBars className="mx-2 cursor-pointer" />
        <Link to="/">
          <img src="./public/images/logotyp90x50.png" alt="Logo" className="h-10 ml-2" />
        </Link>
      </div>
      <h1>Freaky Furniture</h1>
      <Navbar handleSearch={handleSearch} />
      <div className="flex items-center">
        <FaHeart className="mx-2 cursor-pointer" />
        <FaUser className="mx-2 cursor-pointer" />
        <Link to="/cart">
          <FaShoppingBasket className="mx-2 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Header;