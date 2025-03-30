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
router.put('/:productId', (req, res) => {
  const productId = req.params.productId; // Use productId from the URL
  const quantity = parseInt(req.body.quantity, 10); // Parse the quantity from the request body

  console.log('PUT request received with:', { productId, quantity }); // Log the incoming data

  try {
    const stmt = db.prepare('UPDATE cart SET quantity = ? WHERE productId = ?'); // Use "productId" in the query
    const result = stmt.run(quantity, productId);

    console.log('SQL query result:', result); // Log the SQL query result

    if (result.changes > 0) {
      res.status(200).json({ message: 'Cart item updated successfully' });
    } else {
      console.error('No rows updated. Check if the productId exists.');
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error updating cart item:', error); // Log the error
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Clear the cart
router.delete('/clear', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM cart'); // Clear all rows in the cart table
    const result = stmt.run(); // Execute the query
    console.log('Rows deleted:', result.changes); // Log the number of rows deleted
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error); // Log the error
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;