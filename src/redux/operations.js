import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Map frontend vehicleType to API form values
const typeMap = {
  van: "panelTruck",
  "fully-integrated": "fullyIntegrated",
  alcove: "alcove",
};

// Accept filters as an argument
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      // String fields
      if (filters.name) params.append("name", filters.name);
      if (filters.location) params.append("location", filters.location);
      if (filters.vehicleType && typeMap[filters.vehicleType]) {
        params.append("form", typeMap[filters.vehicleType]);
      }
      if (filters.engine) params.append("engine", filters.engine);
      if (filters.transmission) params.append("transmission", filters.transmission);

      // Boolean fields (AC, bathroom, microwave, kitchen, TV, etc.)
      if (filters.equipment && Array.isArray(filters.equipment)) {
        filters.equipment.forEach((key) => {
          // Only add if value is true (checked)
          params.append(key, "true");
        });
      }
      // You can add more boolean/number fields as needed
      if (filters.AC !== undefined) params.append("AC", String(filters.AC));
      if (filters.bathroom !== undefined) params.append("bathroom", String(filters.bathroom));
      if (filters.microwave !== undefined) params.append("microwave", String(filters.microwave));

      // Number fields (exact match)
      if (filters.price) params.append("price", filters.price);
      if (filters.rating) params.append("rating", filters.rating);

      const url = `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${params.toString()}`;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (err) {
        // If 404, treat as empty result
        if (err.response && err.response.status === 404) {
          return [];
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
