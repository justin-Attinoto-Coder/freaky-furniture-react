import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the edit and trash bin icons

const AdminTable = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/furniture') // Fetch furniture data from the API
      .then(response => response.json())
      .then(data => setFurniture(data))
      .catch(error => console.error('Error fetching furniture data:', error));
  }, []);

  const handleEdit = (id) => {
    console.log('Edit product with ID:', id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id) => {
    console.log('Delete product with ID:', id);
    // Show confirmation and delete product
  };

  return (
    <div className="w-3/4 p-4">
      {/* Title and Button Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Produkter</h2>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => navigate('./new')} // Use relative path
        >
          Ny produkt
        </button>
      </div>

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
          {furniture.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.sku}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;