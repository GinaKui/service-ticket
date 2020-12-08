import { configureStore } from '@reduxjs/toolkit';

import logReducer from './reducers/logReducer';
//import techReducer from './reducers/techRedu∂cer';

import techReducer from './components/techs/techSlice';
const store = configureStore({
  reducer: {
    log: logReducer,
    tech: techReducer
  }
});

export default store;