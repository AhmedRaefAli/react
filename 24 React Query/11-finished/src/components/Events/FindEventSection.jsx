import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  // isLoading is better than isPending as it will not be true if it's disabled 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    // But using this ref value for fetchEvents and for this key
    // is actually not ideal, because refs, unlike state in React
    // don't cause this component function to re-execute
    // which means that as the value entered
    // into this input here changes,
    // this query is not updated and not sent again.
    //////////////////////////////////////////////////////////////
    // Well, because React Query
    // and the useQuery hook actually passes some default data
    // And that signal is required for aborting that request.
    // If you, for example, navigate away
    // from this page before the request was finished
    // because React Query thankfully can do that for you,
    // it can abort requests and it does that with help of that signal.
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), //queryKey[1] access { max: 3 }
    //The enabled option determines whether the query should be executed automatically. If enabled is false, the query will not run until it becomes true
    enabled: searchTerm !== undefined // enable only if search term exist use undefined not empty string
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value); //
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
