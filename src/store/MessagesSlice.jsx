import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const index = createAsyncThunk(
  "messages/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allMessages", { params });
      return res.data.messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  one: {},
  loading: false,
  error: null,
  success: null,
};

const MessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = MessagesSlice.actions;
export default MessagesSlice.reducer;
