import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from './components/Events/EditEvent.jsx';
import { queryClient } from './util/http.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
  },
  {
    path: '/events',
    element: <Events />,
    children: [
      {
        path: 'new',
        element: <NewEvent />,
      },
      {
        path: ':id',
        element: <EventDetails />,
        children: [
          {
            path: 'edit',
            element: <EditEvent />,
            loader: editEventLoader,
            action: editEventAction
          },
        ],
      },
    ],
  },
]);

function App() {
  // must wrap the component with <QueryClientProvider client={queryClient}> 
  return (
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
