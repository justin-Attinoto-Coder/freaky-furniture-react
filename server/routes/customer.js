const express = require('express');
const router = express.Router();
const db = require('../db/init');

// Add a new customer
router.post('/', (req, res) => {
  const { firstName, lastName, email, street, postalCode, city } = req.body;
  const stmt = db.prepare('INSERT INTO customers (firstName, lastName, email, street, postalCode, city) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(firstName, lastName, email, street, postalCode, city);
  res.json({ id: info.lastInsertRowid });
});

module.exports = router;