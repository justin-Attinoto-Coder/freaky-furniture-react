import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const HamburgerMenu = ({ isMenuOpen, toggleMenu }) => {
  const categories = ['mobler', 'forvaring', 'detaljer', 'textil'];
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    toggleMenu(); // Close the menu
    navigate(`#${category}`);
  };

  return (
    <div>
      <button
        id="hamburger-button"
        className={`text-2xl cursor-pointer relative w-6 h-6 ${isMenuOpen ? 'toggle-btn' : ''}`}
        onClick={toggleMenu}
      >
        <div className="bg-black w-6 h-0.5 rounded absolute top-3 -mt-0.5 transition-all duration-500 before:content-[''] before:bg-black before:w-6 before:h-0.5 before:rounded before:absolute before:-translate-x-3 before:-translate-y-2 before:transition-all before:duration-500 after:content-[''] after:bg-black after:w-6 after:h-0.5 after:rounded after:absolute after:-translate-x-3 after:translate-y-2 after:transition-all after:duration-500"></div>
      </button>
      {isMenuOpen && (
        <div className="menu-content">
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

HamburgerMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;