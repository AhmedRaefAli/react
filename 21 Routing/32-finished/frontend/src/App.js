import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

// react is SPA but we use react-router-dom lib to handle routes
// as routes render diff content based on url 
// bad side of it on each route you send req to ser to get the new response 
// but here in react it check on route and render diff content based on it without hit server
// u can define diff paths with it's children as path /admin has diff routes 
// element RootLayout act as wrapper around the children 

// important absolute path is / and relative path is without /
// absolute path  comes after domain name like www.example.com/
// relative path is like (home) or (events) means relative paths comes after absolute path
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />, // we define error component if wrong url 
    children: [
      { index: true, element: <HomePage /> }, // index true means it's default route
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader, // loader is used to get data from server before render
            //when we use loader we can use useLoaderData hook to get data
          },
          {
            path: ':eventId', // path parameters  u can use useParams hook to get it
            id: 'event-detail',  // The ID helps in accessing this loaded data from other components using useRouteLoaderData('event-detail')
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction, // you can add action to do some action before render
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

// there is an old way to set routes u can check 
function App() {
  return <RouterProvider router={router} />; // RouterProvider must 
}

export default App;
