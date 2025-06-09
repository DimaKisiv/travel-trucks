import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";
import { filterCampers } from "../helpers/filterCampers";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    isLoadingMore: false,
    error: null,
    filters: {
      location: "",
      vehicleType: "",
      equipment: [],
    },
    page: 1,
    hasMore: true,
  },
  reducers: {
    setCampersFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    resetCampersFilters(state) {
      state.filters = { location: "", vehicleType: "", equipment: [] };
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        // If loading first page, show main loading
        if (state.page === 1) {
          state.status = "loading";
          state.isLoadingMore = false;
        } else {
          // If loading more, only set isLoadingMore
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoadingMore = false;
        const campersArray = action.payload.items || [];
        if (state.page === 1) {
          state.items = campersArray;
        } else {
          state.items = [...state.items, ...campersArray];
        }
        state.hasMore = campersArray.length > 0;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.isLoadingMore = false;
        state.error = action.payload;
      });
  },
});

export const selectCampers = (state) => state.campers.items;
export const selectCampersStatus = (state) => state.campers.status;
export const selectCampersIsLoadingMore = (state) =>
  state.campers.isLoadingMore;
export const selectCampersError = (state) => state.campers.error;
export const selectCampersFilters = (state) => state.campers.filters;
export const selectCampersPage = (state) => state.campers.page;
export const selectCampersHasMore = (state) => state.campers.hasMore;
export const selectFilteredCampers = (state) => {
  if (state.campers.status !== "succeeded") {
    return [];
  }
  return filterCampers(state.campers.items, state.campers.filters);
};

export const {
  setCampersFilters,
  resetCampersFilters,
  incrementPage,
  resetCampers,
} = campersSlice.actions;
export default campersSlice.reducer;
