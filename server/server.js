const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/init'); // Import database initialization
const furnitureRoutes = require('./routes/furniture'); // Import furniture routes
const cartRoutes = require('./routes/cart'); // Import cart routes
const reviewsRoutes = require('./routes/reviews'); // Import reviews routes
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use routes
app.use('/api/furniture', furnitureRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewsRoutes); // Add reviews routes

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});