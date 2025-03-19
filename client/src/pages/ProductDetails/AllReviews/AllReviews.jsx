import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const AllReviews = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });

    axios.get(`http://localhost:8000/api/reviews/${productId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="all-reviews p-4">
      <h2 className="text-2xl font-bold mb-4">Reviews for {product.name}</h2>
      {reviews.length === 0 ? (
        <div>No reviews found</div>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review mb-4 p-4 border rounded">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, starIndex) => (
                <span key={starIndex} className="text-xl">
                  {starIndex < review.rating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
                </span>
              ))}
            </div>
            <p><strong>Review:</strong> {review.reviewText}</p>
            <p><strong>Reviewer:</strong> {review.reviewerName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllReviews;