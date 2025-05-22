import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../src/index.css';

const AccordionItem = ({ title, children, id, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <button
        className={`w-full text-left p-4 ${customClass || 'bg-gray-100'} hover:bg-gray-200 focus:outline-none`}
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

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  customClass: PropTypes.string,
};

const Accordion = () => {
  return (
    <div className="w-full mx-auto sm:my-0">
      {/* Mobile: Accordion (<sm) */}
      <div className="block sm:hidden w-full">
        <AccordionItem
          title="Categories"
          id="kategorier"
          customClass="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <ul>
            <li><a href="#mobler">Möbler</a></li>
            <li><a href="#forvaring">Förvaring</a></li>
            <li><a href="#detaljer">Detaljer</a></li>
            <li><a href="#textil">Textil</a></li>
          </ul>
        </AccordionItem>
        <AccordionItem title="My Pages" id="mina-sidor">
          <ul>
            <li><a href="/account">Mitt konto</a></li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Contact Us" id="kontakta-oss">
          <ul>
            <li><a href="/contact/customer-service">Kundservice</a></li>
            <li><a href="/contact/complaints">Reklamation</a></li>
            <li><a href="/contact/faq">Vanliga frågor</a></li>
            <li><a href="/contact/delivery">Leverans</a></li>
          </ul>
        </AccordionItem>
      </div>
      {/* Desktop: Flex layout (sm and above) */}
      <div className="hidden sm:flex sm:flex-row sm:space-x-4 sm:bg-gray-100 sm:p-4">
        <div className="flex-1">
          <h3 className="font-bold mb-2">Categories</h3>
          <ul>
            <li><a href="#mobler">Möbler</a></li>
            <li><a href="#forvaring">Förvaring</a></li>
            <li><a href="#detaljer">Detaljer</a></li>
            <li><a href="#textil">Textil</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">My Pages</h3>
          <ul>
            <li><a href="/account">Mitt konto</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">Contact Us</h3>
          <ul>
            <li><a href="/contact/customer-service">Kundservice</a></li>
            <li><a href="/contact/complaints">Reklamation</a></li>
            <li><a href="/contact/faq">Vanliga frågor</a></li>
            <li><a href="/contact/delivery">Leverans</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;