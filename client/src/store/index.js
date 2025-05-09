import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // must be an object of reducers

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    error: { message: null }
  }
});

