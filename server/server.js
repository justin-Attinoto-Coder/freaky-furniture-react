const express = require('express');
   const path = require('path');
   const cors = require('cors');
   const db = require('./db/init');
   const furnitureRoutes = require('./routes/furniture');
   const userRoutes = require('./routes/users');
   const bcrypt = require('bcrypt');
   require('dotenv').config();

   const app = express();

   app.use(cors({
     origin: ['https://freaky-furniture-react.onrender.com', 'http://localhost:3000'],
   }));
   app.use(express.json());

   // Automatically create an admin user if one doesn't exist
   async function createAdminUser() {
     const adminExists = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
     if (!adminExists) {
       const username = 'admin';
       const password = 'admin123';
       const hashedPassword = await bcrypt.hash(password, 10);
       db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, 'admin');
       console.log('Admin user created with username: admin and password: admin123');
     }
   }

   createAdminUser();

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use routes
app.use('/api/furniture', furnitureRoutes);
app.use('/api/users', userRoutes);

   // Serve static files from client/dist
   app.use(express.static(path.join(__dirname, '../client/dist')));

   // Serve React app for all other routes
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
   });

   const PORT = process.env.PORT || 8000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });