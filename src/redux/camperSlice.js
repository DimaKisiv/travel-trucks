import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById } from "./operations";

// This slice manages the state for a single camper fetched by ID.
const camperSlice = createSlice({
  name: "camper",
  initialState: {
    item: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.item = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCamper = (state) => state.camper.item;
export const selectCamperStatus = (state) => state.camper.status;
export const selectCamperError = (state) => state.camper.error;

export default camperSlice.reducer;
