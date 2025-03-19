import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/Common/ProductCard';

const Category = ({ furnitureItems }) => {
  const { category } = useParams();
  const filteredItems = furnitureItems.filter(item => item.category === category);

  return (
    <div className="category-page">
      <h1 className="ml-5 mt-5">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

Category.propTypes = {
  furnitureItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;