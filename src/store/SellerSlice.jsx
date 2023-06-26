import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "sellers/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allSellers", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "sellers/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addSeller", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.seller;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeSeller = createAsyncThunk(
  "sellers/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete("deleteSeller", {
        data: { SellerId: id },
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
  "sellers/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editSeller", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.sellerFound;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  one: {},
  count: 0,
  loading: false,
  error: null,
  success: null,
};

const SellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.sellers;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Seller Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeSeller.fulfilled, (state, action) => {
      FireToast("warning", "Seller Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Seller Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = SellerSlice.actions;
export default SellerSlice.reducer;
