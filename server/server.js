const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/init'); // Import database initialization
const furnitureRoutes = require('./routes/furniture'); // Import furniture routes
const userRoutes = require('./routes/users'); // Import user routes

const app = express();
const PORT = 8000;

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
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

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

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});