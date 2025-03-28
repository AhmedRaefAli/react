import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData(); // get loaded data from loader

  //The suspense component is a component
  // which can be used in certain situations
  // to show a fallback whilst we're waiting
  // for other data to arrive. not imported from react 
  return (
    
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}> { // await is must with defer 
      }
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    }); // catch by error element in router
  } else {
    const resData = await response.json(); // must do with defer not just return response 
    return resData.events;
  }
}

/**
 * 
 * And that's a feature that allows you to defer
   when data is loaded.
 * that we actually wanna render a component already
  even though the data is not fully there yet.
 */
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
