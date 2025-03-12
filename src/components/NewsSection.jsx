import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const NewsSection = ({ products }) => {
  return (
    <section className="p-8 mt-8 bg-gray-100">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-4">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

NewsSection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      urlSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewsSection;