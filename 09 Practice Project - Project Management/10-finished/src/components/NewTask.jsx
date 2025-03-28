import { useState } from 'react';

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');

  // now we don't use use ref but we use state cuz of we wanna clear text field when add
  // and don't use ref to update state 
  // we don't wanna to violate of the idea that react beaning in charge of dom and dom update 
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
