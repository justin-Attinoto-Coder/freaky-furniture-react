const ProductDetailsImage = ({ image, name }) => {
    return (
      <div className="product-image-container relative border border-black">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <a href="#" className="heart-icon absolute bottom-2 right-2">
          <img
            src="https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
            alt="Hjärta"
            className="h-6 w-6"
          />
        </a>
      </div>
    );
  };
  
  export default ProductDetailsImage;