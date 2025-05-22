import React from 'react';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import '../../../src/index.css'; // Import your CSS file


const Navbar = ({ handleSearch }) => {
  return (
    <nav className="flex justify-between items-center px-6 bg-gray-100 shadow-md">
      <ul className="flex space-x-1">
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
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Navbar;