import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <ul className="flex space-x-4">
        <li className="cursor-pointer hover:text-blue-500">Möbler</li>
        <li className="cursor-pointer hover:text-blue-500">Förvaring</li>
        <li className="cursor-pointer hover:text-blue-500">Detaljer</li>
        <li className="cursor-pointer hover:text-blue-500">Textil</li>
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;