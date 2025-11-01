import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProfile = createAsyncThunk(
  "allProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_MY_SECRET_KEY;
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile",
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      if (!res.ok) {
        throw new Error("Errore nel caricamento del profili");
      }

      const dataRecived = await res.json();
      return dataRecived;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const allProfileSlice = createSlice({
  name: "allProfile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allProfileSlice.reducer;
