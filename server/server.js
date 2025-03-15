const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/init'); // Import database initialization
const furnitureRoutes = require('./routes/furniture'); // Import furniture routes
const userRoutes = require('./routes/users'); // Import user routes
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON
const cartRoutes = require('./routes/cart'); // Import cart routes

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Automatically create an admin user if one doesn't exist
async function createAdminUser() {
  const adminExists = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const username = 'admin';
    const password = 'admin123'; // You should use a more secure password in production
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, 'admin');
    console.log('Admin user created with username: admin and password: admin123');
  }
}

createAdminUser();

// Use routes
app.use('/api/furniture', furnitureRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});