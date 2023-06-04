import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "banners/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allBanners", { params });
      return res.data.banners;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "banners/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addBanner", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.banner;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeBanner = createAsyncThunk(
  "banners/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete("deleteBanner", {
        data: { BannerId: id },
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
  "banners/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editBanner", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.banner;
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

const BannerSlice = createSlice({
  name: "banners",
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
      FireToast("success", "Banner Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeBanner.fulfilled, (state, action) => {
      FireToast("warning", "Banner Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Banner Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = BannerSlice.actions;
export default BannerSlice.reducer;
