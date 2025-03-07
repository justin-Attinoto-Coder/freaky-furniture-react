import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaTrash } from 'react-icons/fa'; // Import the trash bin icon

const AdminTable = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="w-3/4 p-4">
      {/* Title and Button Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Produkter</h2>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => navigate('new-product')} // Use relative path
        >
          Ny produkt
        </button>
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Namn</th>
            <th className="py-2 px-4 border-b text-left">SKU</th>
            <th className="py-2 px-4 border-b text-left">Pris</th>
            <th className="py-2 px-4 border-b text-left"></th>
          </tr>
        </thead>
        <tbody>
          {/* Example product rows */}
          <tr>
            <td className="py-2 px-4 border-b">Produkt 1</td>
            <td className="py-2 px-4 border-b">SKU001</td>
            <td className="py-2 px-4 border-b">$100</td>
            <td className="py-2 px-4 border-b">
              <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Produkt 2</td>
            <td className="py-2 px-4 border-b">SKU002</td>
            <td className="py-2 px-4 border-b">$200</td>
            <td className="py-2 px-4 border-b">
              <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
          {/* Add more product rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;