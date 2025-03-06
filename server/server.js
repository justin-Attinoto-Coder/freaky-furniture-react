const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const app = express();
const PORT = 8000;

// Initialize SQLite database
const db = new Database('furniture.db', { verbose: console.log });

// Create a table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS furniture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT,
    price REAL,
    description TEXT,
    publishing_date TEXT,
    urlSlug TEXT UNIQUE,
    category TEXT
  )
`).run();

// Utility function to generate URL slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API route to get all furniture items
app.get('/api/furniture', (req, res) => {
  const furniture = db.prepare('SELECT * FROM furniture').all();
  res.json(furniture);
});

// API route to add a new furniture item
app.post('/api/furniture', express.json(), (req, res) => {
  const { name, brand, price, description, publishing_date, category } = req.body;
  const urlSlug = generateSlug(name);
  const stmt = db.prepare('INSERT INTO furniture (name, brand, price, description, publishing_date, urlSlug, category) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(name, brand, price, description, publishing_date, urlSlug, category);
  res.json({ id: info.lastInsertRowid });
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});