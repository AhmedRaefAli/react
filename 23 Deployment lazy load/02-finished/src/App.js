import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// lazy load idea is all component and pages migrated to one big js file
// but with lazy load u download or load this content only when you need it 
// exp all pages or component not in home page you only will need it when visit it 
const BlogPage = lazy(() => import('./pages/Blog')); // lazy load a component this function must passed to lazy func from react
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()), // lazy load the loader too note import as function return promise 
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}> {
                // suspense is a component from react waiting for it's children to be loaded and takes fallback to be shown until it's loaded 
              }
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
