import PropTypes from 'prop-types';
import RecommendedProductCard from './RecommendedProductCard';

const MaybeYouAlsoLike = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Maybe You Also Like</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <RecommendedProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

MaybeYouAlsoLike.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      urlSlug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MaybeYouAlsoLike;