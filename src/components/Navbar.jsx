import SearchBar from './SearchBar';
import PropTypes from 'prop-types';

const Navbar = (props) => {

  return (
    <nav className="flex justify-between items-center px-6 bg-gray-100 shadow-md">
      <ul className="flex space-x-1">
        <li className="cursor-pointer hover:text-blue-500">Möbler</li>
        <li className="cursor-pointer hover:text-blue-500">Förvaring</li>
        <li className="cursor-pointer hover:text-blue-500">Detaljer</li>
        <li className="cursor-pointer hover:text-blue-500">Textil</li>
      </ul>
      <div className="flex items-center">
        <SearchBar handleSearch={props.handleSearch} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    };

export default Navbar;