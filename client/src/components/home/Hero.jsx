import '../../../src/index.css';

const Hero = () => {
  return (
    <div className="hero-container relative">
      <img
        src="/images/hero-one.jfif"
        alt="hero"
        className="w-full h-[400px] object-cover"
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
