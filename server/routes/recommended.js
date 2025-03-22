const express = require('express');
const router = express.Router();
const db = require('../db/init'); // Correct path to your database connection

router.get('/', (req, res) => {
  const query = `
    SELECT furniture.id, furniture.name, furniture.brand, furniture.price, furniture.urlSlug, furniture.image
    FROM recommended
    JOIN furniture ON recommended.product_id = furniture.id
    LIMIT 4
  `;
  try {
    const rows = db.prepare(query).all();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err.message); // Log the error message
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;