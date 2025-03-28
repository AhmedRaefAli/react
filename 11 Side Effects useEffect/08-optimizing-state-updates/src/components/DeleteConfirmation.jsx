import { useEffect } from 'react';

import ProgressBar from './ProgressBar.jsx';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // here useEffect with clean up function component will un mount
  // we can move first setTime out outSide useEffect so when we open dialog
  // and don't click on yes it delete it by it self 
  // but what if we clicked no it will do it so we need clean up function 
  // when click no and component will un mount we clear the TimeOut stop it 
  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => { // clean up function component will un mount
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, [onConfirm]); // make sure function in dependent array dot cuz infinite loop 
  // as when component that hold the function reRender function will recreated 
  // solution  to wrap this function with useCallBack hook to not recreated 
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
