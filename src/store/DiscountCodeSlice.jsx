import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "discountCode/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allDiscountCode", { params });
      return res.data.discountCodes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "discountCode/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addDiscountCode", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.discountCode;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeDiscountCode = createAsyncThunk(
  "discountCode/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete("deleteDiscountCode", {
        data: { DiscountCodeId: id },
      });
      dispatch(index());
      return res;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "discountCode/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editDiscountCode", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.discountCode;
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

const DiscountCodeSlice = createSlice({
  name: "discountCode",
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
      FireToast("success", "Discount Code Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeDiscountCode.fulfilled, (state, action) => {
      FireToast("warning", "Discount Code Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Discount Code Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = DiscountCodeSlice.actions;
export default DiscountCodeSlice.reducer;
