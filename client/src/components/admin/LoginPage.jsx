import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get the intended redirect path (e.g., /admin) or default to /
    const from = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                username,
                password,
            });

            const { token, role } = response.data;
            localStorage.setItem('token', token); // Store the token

            if (role === 'admin') {
                navigate(from, { replace: true }); // Redirect to intended path (e.g., /admin)
            } else {
                navigate('/user-dashboard', { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
                    <MdLogin className="text-pink-500 mr-2" /> Welcome Back!
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                        <FaUser className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full outline-none text-gray-700"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                        <FaLock className="text-gray-400 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full outline-none text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 flex items-center justify-center"
                    >
                        <MdLogin className="mr-2" /> Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;