import { useState } from 'react';
import PropTypes from 'prop-types';

const OverviewAccordionItem = ({ title, children, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border border-gray-300 rounded-xs ${customClass}`}>
      <button
        className="w-full text-left p-4 focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

OverviewAccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};

OverviewAccordionItem.defaultProps = {
  customClass: '',
};

export default OverviewAccordionItem;