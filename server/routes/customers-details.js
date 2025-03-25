const express = require('express');
const router = express.Router();
const db = require('../db/init'); // Correct path to your database connection

router.post('/', (req, res) => {
  console.log('Received request at /api/customer'); // Log when the route is hit
  console.log('Request body:', req.body); // Log the request payload

  const { firstName, lastName, email, street, postalCode, city } = req.body;

  const query = `
    INSERT INTO customers (firstName, lastName, email, street, postalCode, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = db.prepare(query).run(firstName, lastName, email, street, postalCode, city);
    console.log('Customer details saved with ID:', result.lastInsertRowid); // Log the result
    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    console.error('Error saving customer details:', err.message); // Log the error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;