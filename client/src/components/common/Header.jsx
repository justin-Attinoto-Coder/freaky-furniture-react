import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import Navbar from './Navbar';
import HamburgerMenu from './HamburgerMenu';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative flex flex-col justify-between sm:text-sm md:text-xl items-center p-4 bg-white shadow-md">
      <div className="flex items-center justify-between w-full sm:relative">
        <div className="flex items-center">
          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Link to="/">
            <img src="/images/logotyp90x50.png" alt="Logo" className="h-10 ml-5" />
          </Link>
          <div className="hidden sm:flex sm:flex-row ml-5">
            <Navbar handleSearch={props.handleSearch} />
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <FaHeart className="mx-2 cursor-pointer text-2xl" />
          <FaUser className="mx-2 cursor-pointer text-2xl" />
          <Link to="/cart">
            <FaShoppingBasket className="mx-2 cursor-pointer text-2xl" />
          </Link>
        </div>
      </div>
      <div className="sm:hidden w-full mt-4">
        <Navbar handleSearch={props.handleSearch} />
      </div>
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Header;