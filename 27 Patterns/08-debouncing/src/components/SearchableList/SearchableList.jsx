import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  // search functionality global on objects
  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    //And debouncing simply is a technique
    // where we don't update the state on every keystroke,
    // but where we instead define some timing threshold
    // where we only update the state if the user stopped typing
    // for a couple of milliseconds,
    
    // when write new word and ref has value clear time out to wait more
    if (lastChange.current) {
      clearTimeout(lastChange.current)
    }

    // ref refrance to the timer
    lastChange.current = setTimeout(() => { // run late just .5 second
      lastChange.current = null
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} /> 
      <ul> {/** //Well, the core idea behind this render props pattern is that
       * //  you pass a function as a value for the children prop
       *  // render props sample */}
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li> // children can be called as function
        ))}
      </ul>
    </div>
  );
}
