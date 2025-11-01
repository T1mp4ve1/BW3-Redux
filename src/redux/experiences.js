import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchExp = createAsyncThunk(
  "profile/fetchExp",
  async (userId, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_MY_SECRET_KEY;
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      if (!res.ok) {
        throw new Error("Errore nel caricamento esperienze");
      }

      const dataReceved = await res.json();
      return dataReceved;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const experiencesSlice = createSlice({
  name: "exp",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default experiencesSlice.reducer;
