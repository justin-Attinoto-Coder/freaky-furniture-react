const express = require('express');
const router = express.Router();
const db = require('../db/init');
const path = require('path');

// Get all cart items
router.get('/', (req, res) => {
  const stmt = db.prepare(`
    SELECT cart.*, furniture.urlSlug, furniture.image, furniture.brand 
    FROM cart 
    JOIN furniture ON cart.productId = furniture.id
  `);
  const cartItems = stmt.all();
  // Construct the full image URL
  const updatedCartItems = cartItems.map(item => ({
    ...item,
    imageURL: path.join('/images', item.image)
  }));
  res.json(updatedCartItems); // Ensure this returns an array
});

// Add an item to the cart
router.post('/', (req, res) => {
  const { productId, name, price, quantity, imageURL, brand } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO cart (productId, name, price, quantity, imageURL, brand) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(productId, name, price, quantity, imageURL, brand);
    res.json({ id: info.lastInsertRowid });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an item in the cart
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  const stmt = db.prepare('UPDATE cart SET quantity = ? WHERE id = ?');
  stmt.run(quantity, id);
  res.sendStatus(200);
});

// Delete an item from the cart
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM cart WHERE id = ?');
  stmt.run(id);
  res.sendStatus(200);
});

module.exports = router;