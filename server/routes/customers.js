const express = require('express');
const router = express.Router();
const db = require('../db/init'); // Import the database connection

// POST route to handle customer details
router.post('/', (req, res) => {
  console.log('Received a POST request to /api/customers'); // Log when the route is hit
  console.log('Request body:', req.body); // Log the incoming request body

  const { fullName, phoneNumber, province, city, streetAddress, postalCode } = req.body;

  // Validate required fields
  if (!fullName || !phoneNumber || !province || !city || !streetAddress || !postalCode) {
    console.error('Validation failed: Missing required fields'); // Log validation failure
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Save customer details to the database
  const query = `
    INSERT INTO customers (fullName, phoneNumber, province, city, streetAddress, postalCode)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = db.prepare(query).run(fullName, phoneNumber, province, city, streetAddress, postalCode);
    console.log('Customer added successfully:', {
      id: result.lastInsertRowid,
      fullName,
      phoneNumber,
      province,
      city,
      streetAddress,
      postalCode,
    });

    // Respond with success
    res.status(201).json({
      message: 'Customer details saved successfully!',
      customer: {
        id: result.lastInsertRowid,
        fullName,
        phoneNumber,
        province,
        city,
        streetAddress,
        postalCode,
      },
    });
  } catch (error) {
    console.error('Error saving customer details:', error);
    res.status(500).json({ error: 'Failed to save customer details.' });
  }
});

// GET route to fetch all customers (for debugging or admin purposes)
router.get('/', (req, res) => {
  try {
    const customers = db.prepare('SELECT * FROM customers').all();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers.' });
  }
});

module.exports = router;