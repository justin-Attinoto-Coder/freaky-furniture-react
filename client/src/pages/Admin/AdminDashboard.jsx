import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminTopbar from '../../components/Admin/AdminTopbar';
import AdminTable from '../../components/Admin/AdminTable';
import AdminNewProduct from './AdminNewProduct';

const Admin = () => {
  return (
    <div className="admin-page flex flex-col min-h-screen bg-gray-100">
      {/* Topbar */}
      <AdminTopbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="products" element={<AdminTable />} />
            <Route path="products/new" element={<AdminNewProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
