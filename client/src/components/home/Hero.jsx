import '../../../src/index.css'; // Import your CSS file

const Hero = () => {
    return (
        <div className="hero-container">
            <img src=".https://freaky-furniture-react-server.onrender.com/images/hero-one.jfif" alt="hero" />
            <div className="hero-content">
                <h1>Hero Section</h1>
                <p>Your one-stop shop for unique and stylish furniture</p>
                <button>Shop Now</button>
            </div>
        </div>
    )
}

export default Hero;
