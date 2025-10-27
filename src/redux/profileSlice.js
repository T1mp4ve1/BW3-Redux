import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_MY_SECRET_KEY;
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      if (!res.ok) {
        throw new Error("Errore nel caricamento del profilo");
      }

      const dataRecived = await res.json();
      return dataRecived;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
