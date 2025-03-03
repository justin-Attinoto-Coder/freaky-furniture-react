import React, { useState } from 'react';

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
      <AccordionItem title="Categories">
        <ul>
          <li>Möbler</li>
          <li>Förvaring</li>
          <li>Detaljer</li>
          <li>Textil</li>
        </ul>
      </AccordionItem>
      <AccordionItem title="My Pages">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Shop</li>
          <li>Contact</li>
        </ul>
      </AccordionItem>
      <AccordionItem title="Contact Form">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </AccordionItem>
    </div>
  );
};

export default Accordion;