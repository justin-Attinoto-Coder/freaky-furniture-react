import PropTypes from 'prop-types';

const FocusProductDetailsImage = ({ image, name }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={image} alt={name} className="object-cover h-full w-full rounded-lg" />
    </div>
  );
};

FocusProductDetailsImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FocusProductDetailsImage;