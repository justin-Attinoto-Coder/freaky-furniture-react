const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();
const axios = require('axios');
const Database = require('better-sqlite3');

// Connect to the SQLite database
const db = new Database('./db/furniture.db', { verbose: console.log }); // Adjust the path to your SQLite database file

// Fetch valid product IDs from the furniture table
const fetchValidProductIds = () => {
  try {
    const rows = db.prepare('SELECT id FROM furniture').all();
    return rows.map((row) => row.id); // Extract the IDs into an array
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return [];
  }
};

// Use the fetched product IDs
const productIds = fetchValidProductIds();

// Function to generate random reviews for a product
const generateReviewsForProduct = (productId, numReviews = 5) => {
  const reviews = [];
  let totalRating = 0;

  for (let i = 0; i < numReviews; i++) {
    const rating = chance.integer({ min: 1, max: 5 }); // Random rating between 1 and 5
    totalRating += rating;

    reviews.push({
      productId, // Associate the review with the product
      rating, // Random rating
      reviewText: chance.sentence({ words: 10 }), // Random review text
      reviewerName: chance.name(), // Random reviewer name
      createdAt: new Date().toISOString(), // Current timestamp in ISO format
    });
  }

  // Calculate the average rating for the product
  const averageRating = totalRating / numReviews;

  return { reviews, averageRating };
};

// Function to generate reviews for all products
const generateReviewsForAllProducts = (productIds) => {
  const allReviews = [];
  const productRatings = {};

  productIds.forEach((productId) => {
    const { reviews, averageRating } = generateReviewsForProduct(productId);
    allReviews.push(...reviews); // Add reviews to the overall list
    productRatings[productId] = averageRating; // Store the average rating for the product
  });

  return { allReviews, productRatings };
};

// Function to insert reviews into the database using better-sqlite3
const insertReviewsIntoDatabase = (reviews) => {
  try {
    const insert = db.prepare(
      'INSERT INTO reviews (productId, rating, reviewText, reviewerName, createdAt) VALUES (?, ?, ?, ?, ?)'
    );

    reviews.forEach((review) => {
      insert.run(
        review.productId,
        review.rating,
        review.reviewText,
        review.reviewerName,
        review.createdAt
      );
    });

    console.log('Random reviews inserted into the database');
  } catch (error) {
    console.error('Error inserting reviews into the database:', error);
  }
};

// Main function to generate and save reviews
const main = () => {
  const { allReviews, productRatings } = generateReviewsForAllProducts(productIds);

  // Save reviews to a JSON file
  fs.writeFileSync('randomReviews.json', JSON.stringify(allReviews, null, 2));

  // Save average ratings to a JSON file
  fs.writeFileSync('productRatings.json', JSON.stringify(productRatings, null, 2));

  console.log('Random reviews and average ratings generated:');
  console.log('Reviews saved to randomReviews.json');
  console.log('Average ratings saved to productRatings.json');

  // Insert reviews into the database
  insertReviewsIntoDatabase(allReviews);
};

// Run the script
main();