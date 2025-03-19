import { useState } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ title, children, id, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border-1 rounded-xs ${customClass}`} id={id}>
      <button
        className="w-full text-left p-4 focus:outline-none"
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
  id: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};

export default AccordionItem;