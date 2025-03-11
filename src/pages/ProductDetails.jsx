import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsImage from '../components/ProductDetailsImage';
import ProductInformation from '../components/ProductInformation';
import SimilarProducts from '../components/SimilarProducts';

const ProductDetails = () => {
  const { slug } = useParams(); // Get the product slug from the URL
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:8000/api/products/${slug}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));

    // Fetch similar products
    fetch(`http://localhost:8000/api/products/${slug}/similar`)
      .then(response => response.json())
      .then(data => setSimilarProducts(data))
      .catch(error => console.error('Error fetching similar products:', error));
  }, [slug]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Product added to cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <ProductDetailsImage image={product.image} name={product.name} />
        </div>
        <div className="sm:col-span-2">
          <ProductInformation 
            title={product.name} 
            brand={product.brand} 
            description={product.description} 
            price={product.price} 
            onAddToCart={handleAddToCart} 
          />
        </div>
      </div>
      <SimilarProducts products={similarProducts} />
    </div>
  );
};

export default ProductDetails;
