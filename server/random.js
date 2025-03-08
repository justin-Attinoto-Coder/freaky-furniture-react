// filepath: /c:/Workspace/JavaScript2/Freaky Furniture Javascript 2 Projekt/freaky-furniture-react/server/random.js
const Database = require('better-sqlite3');
const Chance = require('chance');
const chance = new Chance();

// Initialize SQLite database
const db = new Database('furniture.db', { verbose: console.log });

// Utility function to generate URL slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
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

    const stmt = db.prepare('INSERT INTO furniture (name, brand, price, description, publishing_date, urlSlug, category, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(name, brand, price, description, publishing_date, urlSlug, category, image);
  }
  console.log(`${count} random products inserted into the database.`);
}

// Create 10 random products
createRandomProducts(10);