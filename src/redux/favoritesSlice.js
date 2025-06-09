import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.ids;
export default favoritesSlice.reducer;
