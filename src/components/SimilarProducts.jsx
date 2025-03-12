import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const SimilarProducts = ({ similarItems }) => {
  if (similarItems.length === 0) {
    return <div>No similar products found</div>;
  }

  return (
    <section className="similar-products p-8 mt-8 bg-gray-100">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
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