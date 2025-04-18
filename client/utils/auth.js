export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const data = await response.json();
    if (data.message === 'Token expired, please log in again') {
      console.log('Token expired, redirecting to login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  return response;
};