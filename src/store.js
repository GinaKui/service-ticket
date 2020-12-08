import { configureStore } from '@reduxjs/toolkit';

import logReducer from './reducers/logReducer';
import techReducer from './reducers/techReducer';

const store = configureStore({
  reducer: {
    log: logReducer,
    tech: techReducer
  }
});

export default store;