const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/init'); // Adjust the path to your database connection
const router = express.Router();
const jwtDecode = require('jwt-decode');

// Generate JWT
const generateToken = (id, role) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp < currentTime;
};

const checkTokenAndRedirect = () => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    console.log('Token expired, redirecting to login...');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  }
};

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    stmt.run(username, hashedPassword, role || 'user');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login a user
router.post('/login', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body

  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Missing username or password'); // Log missing fields
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username);

    if (!user) {
      console.log('User not found:', username); // Log if the user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); // Log the user details

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username); // Log if the password is invalid
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    console.log('Login successful for user:', username); // Log successful login
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', admin, (req, res) => {
  const users = db.prepare('SELECT id, username, role FROM users').all();
  res.json(users);
});

// Get current user profile
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const stmt = db.prepare('SELECT id, username, role FROM users WHERE id = ?');
    const user = stmt.get(decoded.id);
    res.json(user);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;