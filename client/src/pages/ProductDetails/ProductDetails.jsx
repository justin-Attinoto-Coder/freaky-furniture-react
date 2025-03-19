import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import FocusProductCard from '../../components/Product/FocusProductCard';
import SimilarProducts from '../../components/Product/SimilarProducts';
import { useState, useEffect } from 'react';

const ProductDetails = ({ furnitureItems }) => {
  const { urlSlug } = useParams();
  const product = furnitureItems.find(item => item.urlSlug === urlSlug);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (product) {
      axios.get(`http://localhost:8000/api/reviews/${product.id}/average`)
        .then(response => {
          setAverageRating(response.data.averageRating);
        })
        .catch(error => {
          console.error('Error fetching average rating:', error);
        });
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Find similar products based on category and limit to 3
  const similarItems = furnitureItems
    .filter(item => item.category === product.category && item.urlSlug !== product.urlSlug)
    .slice(0, 3);

  return (
    <div className="mt-8">
      <FocusProductCard product={product} averageRating={averageRating} />
      <Link to={`/reviews/${product.id}`} className="text-blue-500 underline">
        See all reviews
      </Link>
      <SimilarProducts similarItems={similarItems} />
    </div>
  );
};

ProductDetails.propTypes = {
  furnitureItems: PropTypes.arrayOf(
    PropTypes.shape({
      urlSlug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductDetails;