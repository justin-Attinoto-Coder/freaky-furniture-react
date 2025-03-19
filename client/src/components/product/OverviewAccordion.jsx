import PropTypes from 'prop-types';
import AccordionItem from '../../components/common/Accordion';

const OverviewAccordion = ({ product, reviews }) => {
  return (
    <div className="w-full mx-auto my-8 border-0 rounded-xs">
      <AccordionItem title="Overview" id="overview" customClass="bg-gradient-to-r from-blue-500 to-purple-500">
        <p>Size and Dimensions: {product.size}</p>
        <p>Weight: {product.weight}</p>
      </AccordionItem>
      <AccordionItem title="Specifications" id="specifications">
        <p>{product.specifications}</p>
      </AccordionItem>
      <AccordionItem title="Reviews" id="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>Rating: {review.rating}</p>
            <p>{review.reviewText}</p>
            <p>Reviewer: {review.reviewerName}</p>
          </div>
        ))}
      </AccordionItem>
      <AccordionItem title="Delivery" id="delivery">
        <p>Standard: PostNord</p>
        <p>Collect at a service point: DHL, Instabox, DB Schenker</p>
        <p>To your personal dwelling:</p>
        <ul>
          <li>AirMe: 17.00-22.00</li>
          <li>Early Bird: 02.20-06.00</li>
          <li>PostNord: Normal working daytime hours</li>
        </ul>
      </AccordionItem>
    </div>
  );
};

OverviewAccordion.propTypes = {
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
  ).isRequired,
};

export default OverviewAccordion;