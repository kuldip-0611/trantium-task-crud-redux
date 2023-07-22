import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/user';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development mode
});

export default store;