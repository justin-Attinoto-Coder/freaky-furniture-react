import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ProductCard from '../Common/ProductCard';
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

const SlickCarousel = ({ items }) => {
  if (items.length === 0) {
    return <div>No items found</div>;
  }

  // Shuffle the array and pick 5 random items
  const shuffledItems = [...items].sort(() => 0.5 - Math.random()).slice(0, 5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536, // Tailwind CSS 2xl
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1280, // Tailwind CSS xl
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024, // Tailwind CSS lg
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // Tailwind CSS md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640, // Tailwind CSS sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="slick-carousel p-8 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Liknande Produkter</h2>
        <Slider {...settings}>
          {shuffledItems.map((item) => (
            <div key={item.id} className="px-2">
              <ProductCard product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

SlickCarousel.propTypes = {
  items: PropTypes.arrayOf(
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

export default SlickCarousel;