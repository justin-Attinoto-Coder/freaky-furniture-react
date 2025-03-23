const express = require('express');
const router = express.Router();
const db = require('../db/init'); // Correct path to your database connection

router.post('/', (req, res) => {
  const { fullName, phoneNumber, province, city, streetAddress, postalCode, shippingMethod, carrier, deliveryTime } = req.body;
  console.log('Received shipping details:', req.body); // Log the incoming request payload

  const query = `
    INSERT INTO shipping_details (fullName, phoneNumber, province, city, streetAddress, postalCode, shippingMethod, carrier, deliveryTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = db.prepare(query).run(fullName, phoneNumber, province, city, streetAddress, postalCode, shippingMethod, carrier, deliveryTime);
    console.log('Shipping details saved with ID:', result.lastInsertRowid); // Log the result
    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    console.error('Error saving shipping details:', err.message); // Log the error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;