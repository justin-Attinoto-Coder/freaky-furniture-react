import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/auth'; // Adjust the path if needed

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8000/api/users/me');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default UserDashboard;