import React from 'react';

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for product 1',
    image: '/path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for product 2',
    image: '/path/to/image2.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for product 3',
    image: '/path/to/image3.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for product 4',
    image: '/path/to/image4.jpg',
  },
];

const NewsSection = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">New Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;