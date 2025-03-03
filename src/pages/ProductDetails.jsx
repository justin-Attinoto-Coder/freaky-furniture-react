import React from 'react';
import ProductDetailsImage from '../components/ProductDetailsImage';
import ProductInformation from '../components/ProductInformation';
import SimilarProducts from '../components/SimilarProducts';

const ProductDetails = () => {
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Product added to cart');
  };

  // Example similar products data
  const similarProducts = [
    { id: 1, name: 'Similar Product 1', image: 'https://placehold.co/200x200', price: '49.99' },
    { id: 2, name: 'Similar Product 2', image: 'https://placehold.co/200x200', price: '59.99' },
    { id: 3, name: 'Similar Product 3', image: 'https://placehold.co/200x200', price: '69.99' },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <ProductDetailsImage image="https://placehold.co/600x800/" name="Example Product" />
        </div>
        <div className="sm:col-span-2">
          <ProductInformation 
            title="Example Product" 
            brand="Example Brand" 
            description="This is an example product description." 
            price="99.99" 
            onAddToCart={handleAddToCart} 
          />
        </div>
      </div>
      <SimilarProducts products={similarProducts} />
    </div>
  );
};

export default ProductDetails;
