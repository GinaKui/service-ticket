import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

//import logReducer from './reducers/logReducer';
import logReducer from './components/logs/logSlice';
//import techReducer from './reducers/techRedu∂cer';
import techReducer from './components/techs/techSlice';
const store = configureStore({
  reducer: {
    log: logReducer,
    tech: techReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;