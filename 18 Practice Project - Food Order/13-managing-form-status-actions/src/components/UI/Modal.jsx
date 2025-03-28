import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

//classname imp to set default value '' as dynamic style if not passed don't set it to undefined
export default function Modal({ children, open, onClose, className = '' }) { 
  const dialog = useRef();

  // useEffect is used to show and hide the modal related with progress ctx
  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close(); // cleanup function to close the modal
  }, [open]);

  return createPortal( // createPortal is used to render the modal in the root element
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
