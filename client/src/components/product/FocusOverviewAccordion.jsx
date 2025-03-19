import { useState } from 'react';
import PropTypes from 'prop-types';

const OverviewAccordionItem = ({ title, children, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border-b ${customClass}`}>
      <button
        className={`w-full text-left p-4 focus:outline-none ${customClass}`}
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

OverviewAccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};

OverviewAccordionItem.defaultProps = {
  customClass: '',
};

const FocusOverviewAccordion = ({ product, reviews = [] }) => {
  return (
    <div className="w-full mx-auto my-12 border-0 rounded-xs">
      <OverviewAccordionItem title="Overview" id="overview" customClass="bg-gradient-to-r from-blue-500 to-purple-500">
        <p>Size and Dimensions: {product.size}</p>
        <p>Weight: {product.weight}</p>
      </OverviewAccordionItem>
      <OverviewAccordionItem title="Specifications" id="specifications">
        <p>{product.specifications}</p>
      </OverviewAccordionItem>
      <OverviewAccordionItem title="Reviews" id="reviews">
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>Rating: {review.rating}</p>
              <p>{review.reviewText}</p>
              <p>Reviewer: {review.reviewerName}</p>
            </div>
          ))
        )}
      </OverviewAccordionItem>
      <OverviewAccordionItem title="Delivery" id="delivery">
        <p>Standard: PostNord</p>
        <p>Collect at a service point: DHL, Instabox, DB Schenker</p>
        <p>To your personal dwelling:</p>
        <ul>
          <li>AirMe: 17.00-22.00</li>
          <li>Early Bird: 02.20-06.00</li>
          <li>PostNord: Normal working daytime hours</li>
        </ul>
      </OverviewAccordionItem>
    </div>
  );
};

FocusOverviewAccordion.propTypes = {
  product: PropTypes.shape({
    size: PropTypes.string,
    weight: PropTypes.string,
    specifications: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      reviewText: PropTypes.string.isRequired,
      reviewerName: PropTypes.string.isRequired,
    })
  ),
};

export default FocusOverviewAccordion;