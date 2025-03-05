import React from 'react';

const SimilarProducts = ({ products }) => {
  return (
    <div className="similar-products mt-8 hidden sm:block">
      <h2 className="text-2xl font-bold mb-4 text-center">Liknande Produkter</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="product-card border border-gray-300 p-4 rounded">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;