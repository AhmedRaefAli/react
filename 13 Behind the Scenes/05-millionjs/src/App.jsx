import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';


// use React tools to see components tree and when record tells you which component reRendered and why 
function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount); // schedule update state to next render 
    setChosenCount((prevChosenCount) => prevChosenCount + 1); 
    console.log(chosenCount); // won't work! 
  }

  // for optimization make sure each component mange it's state and only share state are left up
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
