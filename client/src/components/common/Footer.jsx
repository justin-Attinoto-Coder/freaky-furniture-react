import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="flex justify-between items-center p-4 bg-gray-800 text-white sm:bg-gray-100 sm:text-black">
      <div className="flex items-center">
        <span className="text-2xl font-bold relative flex items-center">
          <FaCopyright className="ml-1 text-sm" /> {/* Encircled C */}
        </span>
        <span className="ml-2 text-xl">Freaky Furniture</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagram size={24} />
        </a>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
          <FaMapMarkerAlt size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;