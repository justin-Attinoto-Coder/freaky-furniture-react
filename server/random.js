const Database = require('better-sqlite3');
const Chance = require('chance');
const chance = new Chance();

// Initialize SQLite database
const db = new Database('./db/furniture.db', { verbose: console.log });

// Utility function to generate URL slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Utility function to generate SKU
function generateSKU() {
  const letters = chance.string({ length: 3, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });
  const numbers = chance.string({ length: 3, pool: '0123456789' });
  return letters + numbers;
}

// Function to clear tables
function clearTables() {
  db.prepare('DELETE FROM reviews').run();
  db.prepare('DELETE FROM furniture').run();
  db.prepare('VACUUM').run(); // Optional: Reclaim space
  console.log('Tables cleared.');
}

// Function to create random products
function createRandomProducts(count) {
  const categories = ['mobler', 'forvaring', 'detaljer', 'textil'];
  for (let i = 0; i < count; i++) {
    const name = chance.sentence({ words: 3 }).slice(0, -1);
    const brand = chance.company();
    const price = chance.floating({ min: 10, max: 1000, fixed: 2 });
    const description = chance.sentence();
    const publishing_date = chance.date({ year: 2022 }).toISOString().split('T')[0];
    const urlSlug = generateSlug(name);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const image = chance.url({ extensions: ['jpg', 'png', 'gif'] });
    const sku = generateSKU(); // Generate SKU

    const stmt = db.prepare('INSERT INTO furniture (name, brand, price, description, publishing_date, urlSlug, category, image, sku) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, brand, price, description, publishing_date, urlSlug, category, image, sku);

    // Add random reviews for the product
    createRandomReviews(info.lastInsertRowid, chance.integer({ min: 1, max: 5 }));
  }
  console.log(`${count} random products inserted into the database.`);
}

// Function to create random reviews for a product
function createRandomReviews(productId, count) {
  for (let i = 0; i < count; i++) {
    const rating = chance.integer({ min: 1, max: 5 });
    const reviewText = chance.sentence();
    const reviewerName = chance.name();
    const stmt = db.prepare('INSERT INTO reviews (productId, rating, reviewText, reviewerName) VALUES (?, ?, ?, ?)');
    stmt.run(productId, rating, reviewText, reviewerName);
  }
  console.log(`${count} random reviews inserted for product ID ${productId}.`);
}

// Clear tables and create 1000 random products
clearTables();
createRandomProducts(1000);