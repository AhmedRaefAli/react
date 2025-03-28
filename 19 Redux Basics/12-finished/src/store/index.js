import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

// redux toolkit will take care of this for us
// we can directly mutate the state in createSlice, it will take care of it for us behind the scenes
// createSlice will generate action creators for us
// createSlice will generate a unique action type for us
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
