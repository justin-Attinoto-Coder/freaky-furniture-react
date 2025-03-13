const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = 8000;
const __dirname = path.resolve();

// Use the cors middleware
app.use(cors());

// Initialize SQLite database
const db = new Database('furniture.db', { verbose: console.log });

// Create furniture table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS furniture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT,
    price REAL,
    description TEXT,
    sku TEXT UNIQUE,
    publishing_date TEXT,
    urlSlug TEXT UNIQUE,
    category TEXT,
    image TEXT
  )
`).run();

// Create users table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
`).run();

// Utility function to generate URL slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Automatically create an admin user if one doesn't exist
async function createAdminUser() {
  const adminExists = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const username = 'admin';
    const password = 'admin123'; // You should use a more secure password in production
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, 'admin');
    console.log('Admin user created with username: admin and password: admin123');
  }
}

createAdminUser();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

// API route to get all furniture items
app.get('/api/furniture', (req, res) => {
  const category = req.query.category;
  let query = 'SELECT * FROM furniture';
  const params = [];
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  const furnitureItems = db.prepare(query).all(...params);
  res.json(furnitureItems);
});

// API route to get a furniture item by URL slug
app.get('/api/furniture/:urlSlug', (req, res) => {
  console.log(`Received request for product with urlSlug: ${req.params.urlSlug}`);
  const product = db.prepare('SELECT * FROM furniture WHERE urlSlug = ?').get(req.params.urlSlug);
  if (product) {
    console.log('Product found:', product);
    res.json(product);
  } else {
    console.log('Product not found');
    res.status(404).send('Product not found');
  }
});

// API route to add a new furniture item
app.post('/api/furniture', (req, res) => {
  const { name, brand, price, description, sku, publishing_date, category, image} = req.body;
  const urlSlug = generateSlug(name);
  const stmt = db.prepare('INSERT INTO furniture (name, brand, price, description, sku, publishing_date, urlSlug, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(name, brand, price, description, sku, publishing_date, urlSlug, category, image);
  res.json({ id: info.lastInsertRowid });
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  try {
    stmt.run(username, hashedPassword, role);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('User already exists');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send({ message: 'Login successful', role: user.role });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});