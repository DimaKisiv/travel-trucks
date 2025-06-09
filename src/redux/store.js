import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campersSlice";
import camperReducer from "./camperSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    camper: camperReducer,
    favorites: favoritesReducer,
  },
});

export default store;
