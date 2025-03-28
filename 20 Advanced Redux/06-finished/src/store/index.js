import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

// this like createStore in redux
// we can pass multiple slices to the configureStore
// redux toolkit will combine them for us
// we can use them in our components
// we can access the state in our components
// we can dispatch actions from our components
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
