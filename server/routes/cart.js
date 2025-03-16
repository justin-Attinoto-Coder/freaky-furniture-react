const express = require('express');
const router = express.Router();
const db = require('../db/init');

// Get all cart items
router.get('/', (req, res) => {
  const stmt = db.prepare(`
    SELECT cart.*, furniture.urlSlug 
    FROM cart 
    JOIN furniture ON cart.productId = furniture.id
  `);
  const cartItems = stmt.all();
  res.json(cartItems); // Ensure this returns an array
});

// Add an item to the cart
router.post('/', (req, res) => {
  const { urlSlug, name, price, quantity } = req.body;
  const productStmt = db.prepare('SELECT id FROM furniture WHERE urlSlug = ?');
  const product = productStmt.get(urlSlug);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const stmt = db.prepare('INSERT INTO cart (productId, name, price, quantity) VALUES (?, ?, ?, ?)');
  const info = stmt.run(product.id, name, price, quantity);
  res.json({ id: info.lastInsertRowid });
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