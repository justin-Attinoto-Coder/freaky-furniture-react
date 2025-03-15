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
    <header className="relative flex flex-col xs:flex-row justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center justify-between w-full xs:w-auto">
        <div className="flex items-center">
          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Link to="/">
            <img src="/images/logotyp90x50.png" alt="Logo" className="h-10 ml-5" />
          </Link>
        </div>
        <div className="flex items-center">
          <FaHeart className="mx-2 cursor-pointer text-2xl" />
          <FaUser className="mx-2 cursor-pointer text-2xl" />
          <Link to="/cart">
            <FaShoppingBasket className="mx-2 cursor-pointer text-2xl" />
          </Link>
        </div>
      </div>
      <div className="xs:flex w-full">
        <Navbar handleSearch={props.handleSearch} />
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 animate-open-menu">
          <ul className="flex flex-col items-center py-4">
            <li className="my-2">
              <Link to="/#mobler" onClick={toggleMenu} className="text-lg">Mobler</Link>
            </li>
            <li className="my-2">
              <Link to="/#forvaring" onClick={toggleMenu} className="text-lg">Forvaring</Link>
            </li>
            <li className="my-2">
              <Link to="/#detaljer" onClick={toggleMenu} className="text-lg">Detaljer</Link>
            </li>
            <li className="my-2">
              <Link to="/#textil" onClick={toggleMenu} className="text-lg">Textil</Link>
            </li>
          </ul>
          <div className="p-4">
            <Navbar handleSearch={props.handleSearch} />
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Header;