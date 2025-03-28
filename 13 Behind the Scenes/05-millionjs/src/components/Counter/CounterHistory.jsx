import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      
      {history.map((count) => (
        // state is scoped to component but also to position and this why you must add key 
        // and we prefer a key to be unique not just index 
        // if i focused on element and then if i add new element to history  it will focus on another item with same key index let's say 2
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
