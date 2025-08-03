import { useState } from 'react';
import type { ReactNode, FC } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Propsの型定義
interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>
          <KeyboardArrowUpIcon />
        </span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;