import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button.jsx';


// use forwardRef for old react older than 19 
const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  // useImperativeHandle use it to expose function from component 
  useImperativeHandle(ref, () => {
    // the input ref now ref to this obj with open function 
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // we use create portal to render a component in a place diff of it's place in component tree 
  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
