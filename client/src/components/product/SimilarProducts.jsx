import PropTypes from 'prop-types';
import SlickCarousel from '../Product/SlickCarousel';

const SimilarProducts = ({ similarItems }) => {
  return <SlickCarousel items={similarItems} />;
};

SimilarProducts.propTypes = {
  similarItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SimilarProducts;