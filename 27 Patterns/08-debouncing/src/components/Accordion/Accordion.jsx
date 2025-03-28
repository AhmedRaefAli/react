import { createContext, useContext, useState } from 'react';

import AccordionItem from './AccordionItem.jsx';
import AccordionTitle from './AccordionTitle.jsx';
import AccordionContent from './AccordionContent.jsx';

const AccordionContext = createContext();

// custom hook to use context share which item open
export function useAccordionContext() {
  const ctx = useContext(AccordionContext); 

  if (!ctx) {
    throw new Error( 
      'Accordion-related components must be wrapped by <Accordion>.'
    );
  }

  return ctx;
}
// compound component is a component from multi components acts as one component and share state 
// Accordion is a sample of compound component it's a good use case for context 
export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState(); 

  function toggleItem(id) {
    // if id is the same means u wanna close it if another means u wanna close it and open another one
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}


// Best way to compound component
Accordion.Item = AccordionItem; //  to be used in app as <Accordion.Item></Accordion.Item>
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
