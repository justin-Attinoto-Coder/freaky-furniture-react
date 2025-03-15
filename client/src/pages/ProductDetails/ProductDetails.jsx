import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductInformation from '../../components/Product/ProductInformation';
import ProductDetailsImage from '../../components/Product/ProductDetailsImage';
import SimilarProducts from '../../components/Product/SimilarProducts';

const ProductDetails = ({ furnitureItems }) => {
  const { urlSlug } = useParams();
  const product = furnitureItems.find(item => item.urlSlug === urlSlug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    axios.post('http://localhost:8000/api/cart', {
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity
    })
    .then(response => {
      console.log('Product added to cart:', response.data);
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  };

  // Find similar products based on category and limit to 3
  const similarItems = furnitureItems
    .filter(item => item.category === product.category && item.urlSlug !== product.urlSlug)
    .slice(0, 3);

  return (
    <div>
      <ProductDetailsImage image={product.image} name={product.name} />
      <ProductInformation
        title={product.name}
        brand={product.brand}
        description={product.description}
        price={product.price}
        onAddToCart={handleAddToCart}
      />
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