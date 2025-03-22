const Database = require('better-sqlite3');
const db = new Database('./db/furniture.db', { verbose: console.log });

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
    image TEXT,
    size TEXT,          -- New field for size
    dimensions TEXT,    -- New field for dimensions
    weight TEXT,        -- New field for weight
    material TEXT,      -- New field for material
    specifications TEXT -- New field for specifications
  )
`).run();

// Create cart table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    imageURL TEXT NOT NULL,
    brand TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES furniture(id)
  )
`).run();

// Create reviews table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    reviewText TEXT,
    reviewerName TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES furniture(id)
  )
`).run();

// Create customers table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    street TEXT NOT NULL,
    postalCode TEXT NOT NULL,
    city TEXT NOT NULL
  )
`).run();

// Create recommended table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS recommended (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES furniture(id)
  )
`).run();

// Automatically fill the recommended table if it's empty
const recommendedCount = db.prepare('SELECT COUNT(*) AS count FROM recommended').get().count;
if (recommendedCount === 0) {
  const furnitureItems = db.prepare('SELECT id FROM furniture').all();
  const insertRecommended = db.prepare('INSERT INTO recommended (product_id) VALUES (?)');
  furnitureItems.forEach(item => {
    insertRecommended.run(item.id);
  });
}

module.exports = db;