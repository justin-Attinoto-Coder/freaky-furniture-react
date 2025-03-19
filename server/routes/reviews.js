const express = require('express');
const db = require('../db/init');
const router = express.Router();

// Get all reviews for a product
router.get('/:productId', (req, res) => {
  const reviews = db.prepare('SELECT * FROM reviews WHERE productId = ?').all(req.params.productId);
  res.json(reviews);
});

// Get average rating for a product
router.get('/:productId/average', (req, res) => {
  const reviews = db.prepare('SELECT rating FROM reviews WHERE productId = ?').all(req.params.productId);
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;
  res.json({ averageRating });
});

// Add a new review
router.post('/', (req, res) => {
  const { productId, rating, reviewText, reviewerName } = req.body;
  const info = db.prepare('INSERT INTO reviews (productId, rating, reviewText, reviewerName) VALUES (?, ?, ?, ?)').run(productId, rating, reviewText, reviewerName);

  const newReview = db.prepare('SELECT * FROM reviews WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newReview);
});

module.exports = router;