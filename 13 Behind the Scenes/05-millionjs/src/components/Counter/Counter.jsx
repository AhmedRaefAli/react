import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// memo is used to prevent component reRender if it parent reRender only if it's props too changed 
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // use memo used around any normal function to memorize a value and only recalculate if input change 
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // this run only as initialization with first Render
  // so when initialCount change this code not reInitialized again 
  // so why we add key to this component when calling in in app component to make sure
  // when key = {initialCount} when initialCount change ReCreate newOne 
  const [counterChanges, setCounterChanges] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  // we use useCallback with memo and useEffect always 
  // to not recreate a function when component reRender
  // not that handleIncrement is passed to IconButton as prop 
  // which is wrapped by memo which aim to not reRender if CounterReRender 
  // but also if prop changed so we must wrap handleIncrement with useCallBack
  // to not reCreate new function each time Counter reCreated 
  // and pass as new Prop to IconButton
  const handleIncrement = useCallback(function handleIncrement() {
    setCounterChanges((prevCounterChanges) => [
      { value: 1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;

// note don't use memo or UseMemo a lot as it also cost performance to add extra check 
// don't use memo if props changed freq and use it on top as you can cuz of you stop reRender it you also stopped reRender it's children 
