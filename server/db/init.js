const Database = require('better-sqlite3');
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

module.exports = db;