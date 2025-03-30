const AdminTopbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;