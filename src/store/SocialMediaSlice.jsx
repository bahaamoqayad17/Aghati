import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "SocialMedia/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("SocialMedia/get", { params });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "SocialMedia/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("SocialMedia/create", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.SocialMedia;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeSocialMedia = createAsyncThunk(
  "SocialMedia/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete("SocialMedia/delete", {
        data: { SocialMediaId: id },
      });
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "SocialMedia/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("SocialMedia/edit", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.SocialMedia;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
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

const SocialMedialice = createSlice({
  name: "SocialMedia",
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
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "SocialMedia Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeSocialMedia.fulfilled, (state, action) => {
      FireToast("warning", "SocialMedia Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "SocialMedia Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = SocialMedialice.actions;
export default SocialMedialice.reducer;
