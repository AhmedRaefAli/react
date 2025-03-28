import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

// why do we need redux even if we have context?
// context is great for passing data down the component tree
// but it's not great for passing data up the component tree
// with redux, we can pass data up and
// down the component tree in a more efficient way
// we can also use redux to manage global state
// redux is great for managing complex state
// with redux, we can also use middleware
// redux is great for debugging
// redux is great for performance optimization
// redux is great for code organization
// redux is great for testing
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // wrap the App component with the Provider component and pass the store as a prop
  // like this, the store is available in the whole application
  // like context, but for redux
  <Provider store={store}>
    <App />
  </Provider>
);
