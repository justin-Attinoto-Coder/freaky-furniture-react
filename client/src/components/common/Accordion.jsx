import { useState } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
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
    <div className="max-w-md mx-auto my-8">
      <AccordionItem title="Kategorier">
        <ul>
          <li><a href="#mobler">Möbler</a></li>
          <li><a href="#forvaring">Förvaring</a></li>
          <li><a href="#detaljer">Detaljer</a></li>
          <li><a href="#textil">Textil</a></li>
        </ul>
      </AccordionItem>
      <AccordionItem title="Mina sidor">
        <ul>
          <li><a href="/">Hem</a></li>
          <li><a href="/about">Om oss</a></li>
          <li><a href="/shop">Handla</a></li>
          <li><a href="/contact">Kontakt oss</a></li>
        </ul>
      </AccordionItem>
      <AccordionItem title="Kontakta Oss">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Namn</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mejladress</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Meddelande</label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Skicka
          </button>
        </form>
      </AccordionItem>
    </div>
  );
};
AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;