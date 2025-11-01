import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOtherUser = createAsyncThunk(
  "profile/fetchOtherUser",
  async (userId, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_MY_SECRET_KEY;
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );
      if (!res.ok) {
        throw new Error("Errore nel caricamento del altro profilo");
      }
      const dataRecived = await res.json();
      return dataRecived;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const otherProfileSlice = createSlice({
  name: "otherProfile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOtherUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default otherProfileSlice.reducer;
