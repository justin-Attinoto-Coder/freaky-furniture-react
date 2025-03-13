import PropTypes from 'prop-types';
import '../../index.css';

const HamburgerMenu = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      id="hamburger-button"
      className={`text-3xl cursor-pointer relative w-8 h-8 ${isMenuOpen ? 'toggle-btn' : ''}`}
      onClick={toggleMenu}
    >
      <div className="bg-black w-8 h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500 before:content-[''] before:bg-black before:w-8 before:h-1 before:rounded before:absolute before:-translate-x-4 before:-translate-y-3 before:transition-all before:duration-500 after:content-[''] after:bg-black after:w-8 after:h-1 after:rounded after:absolute after:-translate-x-4 after:translate-y-3 after:transition-all after:duration-500"></div>
    </button>
  );
};

HamburgerMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;