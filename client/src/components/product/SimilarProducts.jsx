import PropTypes from 'prop-types';
import ProductCard from '../Common/ProductCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const NextArrow = ({ onClick }) => (
  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
    <FaArrowRight className="text-3xl text-gray-700 hover:text-gray-900" />
  </div>
);

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const PrevArrow = ({ onClick }) => (
  <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
    <FaArrowLeft className="text-3xl text-gray-700 hover:text-gray-900" />
  </div>
);

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const SimilarProducts = ({ similarItems }) => {
  const settings = {
    dots: true,
    infinite: true, // Ensure infinite scrolling
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640, // Mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // Large desktop breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1536, // Extra large desktop breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1920, // Ultra large desktop breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2560, // 2K resolution
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3200, // 3K resolution
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3840, // 4K resolution
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 5120, // 5K resolution
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 7680, // 8K resolution
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Limit the number of similar products to 8
  const limitedSimilarItems = similarItems.slice(0, 8);

  return (
    <section className="similar-products p-8 mt-8 sm:mt-28">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-left mb-4">Liknande Produkter</h2>
        <Slider {...settings}>
          {limitedSimilarItems.map(item => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </Slider>
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