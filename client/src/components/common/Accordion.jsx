import { useState } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b" id={id}>
      <button
        className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
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

const Accordion = () => {
  return (
    <div className="w-full mx-auto my-8 sm:my-0"> {/* Set width to full and remove margin */}
      {/* Accordion for smaller screens */}
      <div className="block sm:hidden">
        <AccordionItem title="Kategorier" id="kategorier">
          <ul>
            <li><a href="#mobler">Möbler</a></li>
            <li><a href="#forvaring">Förvaring</a></li>
            <li><a href="#detaljer">Detaljer</a></li>
            <li><a href="#textil">Textil</a></li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Mina sidor" id="mina-sidor">
          <ul>
            <li><a href="#">Mitt konto</a></li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Kontakta Oss" id="kontakta-oss">
          <ul>
            <li><a href="#">Kundservice</a></li>
            <li><a href="#">Reklamation</a></li>
            <li><a href="#">Vanliga frågor</a></li>
            <li><a href="#">Leverans</a></li>
          </ul>
        </AccordionItem>
      </div>

      {/* Static columns for sm breakpoint and above */}
      <div className="hidden sm:flex sm:flex-row sm:space-x-4 sm:bg-gray-100 sm:p-4 "> {/* Align columns to the left */}
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

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default Accordion;