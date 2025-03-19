import PropTypes from 'prop-types';

const FocusProductDetailsImage = ({ image, name }) => {
  return (
    <img src={image} alt={name} className="w-full h-auto rounded-lg" />
  );
};

FocusProductDetailsImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FocusProductDetailsImage;