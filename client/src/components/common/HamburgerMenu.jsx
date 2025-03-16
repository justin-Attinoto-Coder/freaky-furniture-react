import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const HamburgerMenu = ({ isMenuOpen, toggleMenu }) => {
  const categories = ['mobler', 'forvaring', 'detaljer', 'textil'];
  const additionalLinks = [
    { name: 'Mina sidor', href: '#mina-sidor' },
    { name: 'Kontakta oss', href: '#kontakta-oss' },
    { name: 'Social Media', href: '#footer' }, // Updated href to #footer
  ];
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    toggleMenu(); // Close the menu
    navigate(`#${category}`);
  };

  const handleLinkClick = (href) => {
    toggleMenu(); // Close the menu
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        id="hamburger-button"
        className={`text-2xl cursor-pointer relative w-6 h-6 z-50 ${isMenuOpen ? 'toggle-btn' : ''}`} // Added z-50 to ensure visibility
        onClick={toggleMenu}
      >
        <div className="bg-black w-6 h-0.5 rounded absolute top-3 -mt-0.5 transition-all duration-500 before:content-[''] before:bg-black before:w-6 before:h-0.5 before:rounded before:absolute before:-translate-x-3 before:-translate-y-2 before:transition-all before:duration-500 after:content-[''] after:bg-black after:w-6 after:h-0.5 after:rounded after:absolute after:-translate-x-3 after:translate-y-2 after:transition-all after:duration-500"></div>
      </button>
      {isMenuOpen && (
        <div className="menu-content animate-bounceIn fixed top-0 left-0 w-full h-full bg-white z-40"> {/* Changed absolute to fixed and added animate-bounceIn */}
          <ul className="flex flex-col items-center justify-center h-full">
            {categories.map((category, index) => (
              <li key={index} className="text-2xl my-4" onClick={() => handleCategoryClick(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
            <hr className="w-3/4 my-4 border-t-2 border-gray-300" /> {/* Horizontal rule */}
            {additionalLinks.map((link, index) => (
              <li key={index} className="text-2xl my-4" onClick={() => handleLinkClick(link.href)}>
                {link.name}
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