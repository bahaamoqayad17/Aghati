import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "deliveries/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allDeliveries", { params });
      return res.data.deliveries;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "deliveries/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addDelivery", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.delivery;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeDelivery = createAsyncThunk(
  "deliveries/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete("deleteDelivery", {
        data: { DeliveryId: id },
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
  "deliveries/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editDelivery", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.delivery;
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

const DeliverySlice = createSlice({
  name: "deliveries",
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
      FireToast("success", "Delivery Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeDelivery.fulfilled, (state, action) => {
      FireToast("warning", "Delivery Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Delivery Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = DeliverySlice.actions;
export default DeliverySlice.reducer;
