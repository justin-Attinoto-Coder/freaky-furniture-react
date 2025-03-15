import SearchBar from './SearchBar';
import PropTypes from 'prop-types';

const Navbar = ({ handleSearch }) => {
  return (
    <nav className="flex flex-col items-left px-2 mt-4 w-full">
      <ul className="flex space-x-1 mb-4">
        <li className="cursor-pointer hover:text-blue-500">
          <a href="#mobler">Möbler</a>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <a href="#forvaring">Förvaring</a>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <a href="#detaljer">Detaljer</a>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <a href="#textil">Textil</a>
        </li>
      </ul>
      <div className="w-full">
        <SearchBar handleSearch={handleSearch} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Navbar;