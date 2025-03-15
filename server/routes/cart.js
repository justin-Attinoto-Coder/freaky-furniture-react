const express = require('express');
const router = express.Router();
const db = require('../db/init');

// Get all cart items for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const stmt = db.prepare('SELECT * FROM cart WHERE userId = ?');
  const cartItems = stmt.all(userId);
  res.json(cartItems);
});

// Add an item to the cart
router.post('/', (req, res) => {
  const { userId, productId, quantity } = req.body;
  const stmt = db.prepare('INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)');
  const info = stmt.run(userId, productId, quantity);
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