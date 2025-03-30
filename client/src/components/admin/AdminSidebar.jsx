import { NavLink } from 'react-router-dom';
import { FaTable, FaPlus } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-lg font-bold text-gray-800 border-b">Admin Panel</div>
      <nav className="p-4">
        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <FaTable className="mr-2" />
          Manage Products
        </NavLink>
        <NavLink
          to="products/new"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <FaPlus className="mr-2" />
          Add New Product
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;