import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimationState = { opacity: 0, y: 30 };
  // animate dialog 
  return createPortal(
    <> 
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 }, // before init 
          visible: { opacity: 1, y: 0 }, // after init
          exit: { opacity: 0, y: 30 }, // before exist
        }}
        initial="hidden" // before init state 
        animate="visible" // after init
        exit="exit"  // before exist
        open // The `open` prop ensures that the dialog element is open.
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
