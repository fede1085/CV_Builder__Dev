
import React, { useState } from 'react';
import { ChevronRightIcon } from './Icons';

interface AccordionProps {
  title: string;
  subtitle: string;
  isContract: boolean;
  description: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, subtitle, isContract, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-notion-divider py-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center text-left gap-2"
        aria-expanded={isOpen}
      >
        <ChevronRightIcon className={`w-5 h-5 text-notion-gray transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        <div className="flex-grow">
          <p className="font-semibold text-notion-text">
            {title} {isContract && <span className="font-normal text-notion-gray">(tijdelijk contract)</span>}
          </p>
          <p className="text-sm text-notion-gray">{subtitle}</p>
        </div>
      </button>
      {isOpen && (
        <div className="pt-2 pl-7 text-notion-text/90 leading-relaxed text-sm">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;