const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/init');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  try {
    stmt.run(username, hashedPassword, role);
    res.status(201).send('User registered');
  } catch {
    res.status(400).send('User already exists');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send({ message: 'Login successful', role: user.role });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

module.exports = router;