import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import camperReducer from './camperSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
    camper: camperReducer,
  },
});

export default store;