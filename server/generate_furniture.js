const Database = require('better-sqlite3');
const db = new Database('./db/furniture.db', { verbose: console.log });

// Arrays for random data
const names = [
  'Sofa', 'Chair', 'Table', 'Desk', 'Bed', 'Bookshelf', 'Cabinet', 'Dresser', 'Recliner', 'Ottoman',
  'Bench', 'Stool', 'Wardrobe', 'Nightstand', 'Console', 'Armchair', 'Dining Table', 'Coffee Table', 'TV Stand', 'Barstool'
];
const brands = ['IKEA', 'Ashley', 'West Elm', 'CB2', 'Herman Miller', 'La-Z-Boy', 'Pottery Barn', 'Room & Board', 'Ethan Allen', 'Serta'];
const categories = ['Living Room', 'Bedroom', 'Office', 'Storage', 'Textile', 'Kitchen'];
const descriptions = [
  'Modern design with plush cushioning',
  'Classic style with durable frame',
  'Sleek and minimalist look',
  'Comfortable and stylish',
  'Perfect for small spaces',
  'Elegant and functional',
  'Sturdy construction with timeless appeal',
  'Luxurious comfort for any room',
  'Versatile and chic',
  'Bold design with premium materials'
];
const imageBaseUrl = '/images/';
const imageNames = ['hero-one.jfif', 'hero-two.jfif'];

// Function to generate random date in ISO format (within last 2 years)
function randomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date(2025, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

// Function to generate unique SKU
function generateSKU(index) {
  return `SKU-${String(index).padStart(4, '0')}`;
}

// Function to generate unique urlSlug
function generateUrlSlug(name, index) {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${index}`;
}

// Clear existing data to avoid UNIQUE constraint errors
db.prepare('DELETE FROM furniture').run();

// Prepare insert statement
const insert = db.prepare(`
  INSERT INTO furniture (name, brand, price, description, sku, publishing_date, urlSlug, category, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Generate and insert 100 products
const transaction = db.transaction(() => {
  for (let i = 1; i <= 100; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = (Math.random() * 1000 + 50).toFixed(2); // $50-$1050
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const sku = generateSKU(i);
    const publishing_date = randomDate();
    const urlSlug = generateUrlSlug(name, i);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const image = imageBaseUrl + (i <= 50 ? imageNames[0] : imageNames[1]);

    insert.run(name, brand, price, description, sku, publishing_date, urlSlug, category, image);
  }
});

// Execute transaction
transaction();

console.log('Inserted 100 furniture products.');
db.close();