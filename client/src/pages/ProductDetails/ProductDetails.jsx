import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ProductInformation from '../../components/product/ProductInformation';
import ProductDetailsImage from '../../components/product/ProductDetailsImage';
import SimilarProducts from '../../components/product/SimilarProducts';

const ProductDetails = ({ furnitureItems }) => {
  const { urlSlug } = useParams();
  const product = furnitureItems.find(item => item.urlSlug === urlSlug);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Find similar products based on category and limit to 3
  const similarItems = furnitureItems
    .filter(item => item.category === product.category && item.urlSlug !== product.urlSlug)
    .slice(0, 3);

  return (
    <div>
      <ProductDetailsImage image={product.image} name={product.name} /> {/* Added ProductDetailsImage component */}
      <ProductInformation
        title={product.name}
        brand={product.brand}
        description={product.description}
        price={product.price}
        onAddToCart={() => console.log('Add to cart')}
      />
      <SimilarProducts similarItems={similarItems} /> {/* Added SimilarProducts component */}
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
      category: PropTypes.string.isRequired, // Added category prop type
    })
  ).isRequired,
};

export default ProductDetails;
