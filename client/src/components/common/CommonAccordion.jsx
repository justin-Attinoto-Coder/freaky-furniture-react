import { useState } from 'react';
import PropTypes from 'prop-types';

const CommonAccordionItem = ({ title, children, id, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border-b ${customClass}`} id={id}>
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

CommonAccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};

CommonAccordionItem.defaultProps = {
  customClass: '',
};

const CommonAccordion = () => {
  return (
    <div className="w-full mx-auto sm:my-0"> {/* Set width to full and remove margin */}
      {/* Accordion for smaller screens */}
      <div className="block sm:hidden w-full"> {/* Ensure full width on mobile */}
        <CommonAccordionItem title="Kategorier" id="kategorier" customClass="bg-gradient-to-r from-blue-500 to-purple-500">
          <ul>
            <li><a href="#mobler">Möbler</a></li>
            <li><a href="#forvaring">Förvaring</a></li>
            <li><a href="#detaljer">Detaljer</a></li>
            <li><a href="#textil">Textil</a></li>
          </ul>
        </CommonAccordionItem>
        <CommonAccordionItem title="Mina sidor" id="mina-sidor">
          <ul>
            <li><a href="#">Mitt konto</a></li>
          </ul>
        </CommonAccordionItem>
        <CommonAccordionItem title="Kontakta Oss" id="kontakta-oss">
          <ul>
            <li><a href="#">Kundservice</a></li>
            <li><a href="#">Reklamation</a></li>
            <li><a href="#">Vanliga frågor</a></li>
            <li><a href="#">Leverans</a></li>
          </ul>
        </CommonAccordionItem>
      </div>

      {/* Static columns for sm breakpoint and above */}
      <div className="hidden sm:flex sm:flex-row sm:space-x-4 sm:bg-gray-100 sm:p-4"> {/* Align columns to the left */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Kategorier</h3>
          <ul>
            <li><a href="#mobler">Möbler</a></li>
            <li><a href="#forvaring">Förvaring</a></li>
            <li><a href="#detaljer">Detaljer</a></li>
            <li><a href="#textil">Textil</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">Mina sidor</h3>
          <ul>
            <li><a href="#">Mitt konto</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">Kontakta Oss</h3>
          <ul>
            <li><a href="#">Kundservice</a></li>
            <li><a href="#">Reklamation</a></li>
            <li><a href="#">Vanliga frågor</a></li>
            <li><a href="#">Leverans</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonAccordion;