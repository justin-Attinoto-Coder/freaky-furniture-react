import { useState } from 'react';
import '../../../src/index.css';

const Hero = () => {
  const baseUrl = 'https://freaky-furniture-react-server.onrender.com';
  const imagePath = '/images/hero-one.jfif';
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getImageUrl = () => {
    if (imagePath) {
      let normalizedPath = imagePath;
      if (!normalizedPath.startsWith('http') && !normalizedPath.startsWith('/')) {
        normalizedPath = `/images/${normalizedPath.replace(/^images\//, '')}`;
      } else if (!normalizedPath.startsWith('http') && normalizedPath.startsWith('/')) {
        normalizedPath = normalizedPath.replace(/^\/+images\//, '/images/');
      }
      return normalizedPath.startsWith('http') ? normalizedPath : `${baseUrl}${normalizedPath}`;
    }
    return 'https://via.placeholder.com/150?text=No+Image';
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/150?text=No+Image';
    event.target.onerror = null; // Prevent infinite error loop
    setIsImageLoaded(true);
  };

  return (
    <div className="hero-container relative">
      {!isImageLoaded && (
        <div className="w-full h-[400px] bg-gray-200 animate-pulse"></div>
      )}
      <img
        src={getImageUrl()}
        alt="hero"
        className={`w-full h-[400px] object-cover ${isImageLoaded ? '' : 'hidden'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className="hero-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Freaky Furniture</h1>
        <p className="text-lg mb-6">Your one-stop shop for unique and stylish furniture</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
