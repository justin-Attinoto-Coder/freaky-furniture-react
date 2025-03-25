const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/init'); // Import database initialization
const furnitureRoutes = require('./routes/furniture'); // Import furniture routes
const cartRoutes = require('./routes/cart'); // Import cart routes
const reviewsRoutes = require('./routes/reviews'); // Import reviews routes
const recommendedRoutes = require('./routes/recommended'); // Import the recommended routes
const shippingDetailsRoutes = require('./routes/shipping-details'); // Import shipping details routes
const customersDetailsRoutes = require('./routes/customers-details'); // Import customer details routes
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Use routes
app.use('/api/furniture', furnitureRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewsRoutes); // Add reviews routes
app.use('/api/recommended', recommendedRoutes); // Use the recommended routes
app.use('/api/shipping-details', shippingDetailsRoutes); // Use the shipping details routes
app.use('/api/customers-details', customersDetailsRoutes); // Use the customer details routes

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM furniture WHERE id = ?').get(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/api/reviews/:productId', (req, res) => {
  const reviews = db.prepare('SELECT * FROM reviews WHERE productId = ?').all(req.params.productId);
  res.json(reviews);
});

// Example endpoint to fetch categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'mobler', name: 'Möbler' },
    { id: 'forvaring', name: 'Förvaring' },
    { id: 'detaljer', name: 'Detaljer' },
    { id: 'textil', name: 'Textil' },
  ];
  res.json(categories);
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});