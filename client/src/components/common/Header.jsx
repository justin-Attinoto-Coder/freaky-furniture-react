import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import Navbar from './Navbar';
import HamburgerMenu from './HamburgerMenu';

const Header = ({ handleSearch, cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Debug: Log cartItems whenever it updates
  useEffect(() => {
    console.log('cartItems updated in Header:', cartItems);
  }, [cartItems]);

  return (
    <header className="relative flex flex-col justify-between sm:text-sm md:text-xl items-center p-4 bg-white shadow-md">
      <div className="flex items-center justify-between w-full sm:relative">
        <div className="flex items-center">
          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Link to="/">
            <img src="/images/logotyp90x50.png" alt="Logo" className="h-10 ml-5" />
          </Link>
          <div className="hidden sm:flex sm:flex-row ml-5">
            <Navbar handleSearch={handleSearch} />
          </div>
        </div>
        <div className="flex items-center ml-auto relative">
          <FaHeart className="mx-2 cursor-pointer text-2xl" />
          <FaUser className="mx-2 cursor-pointer text-2xl" />
          <Link to="/cart" className="relative">
            <FaShoppingBasket className="mx-2 cursor-pointer text-2xl" />
            {totalItemsInCart > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="sm:hidden w-full mt-4">
        <Navbar handleSearch={handleSearch} />
      </div>
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Header;