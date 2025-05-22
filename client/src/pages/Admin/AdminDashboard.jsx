import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminTable from '../../components/admin/AdminTable';
import AdminNewProduct from './AdminNewProduct';
import '../../../src/index.css'; // Import your CSS file


const Admin = () => {
  return (
    <div className="admin-page flex flex-col min-h-screen">
      <AdminTopbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 p-4">
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
