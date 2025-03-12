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

// Utility function to generate URL slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// API route to add a new furniture item
app.post('/api/furniture', (req, res) => {
  const { name, brand, price, description, sku, publishing_date, category, image } = req.body;
  const urlSlug = generateSlug(name);
  const stmt = db.prepare('INSERT INTO furniture (name, brand, price, description, sku, publishing_date, urlSlug, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(name, brand, price, description, sku, publishing_date, urlSlug, category, image);
  res.json({ id: info.lastInsertRowid });
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});