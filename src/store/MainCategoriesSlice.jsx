import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "MainCateogry/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allCategory", { params });
      return res.data.categories;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "MainCateogry/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addCategory", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.category;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeMainCategory = createAsyncThunk(
  "MainCateogry/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete("deleteCategory", {
        data: {
          CategoryId: id,
        },
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
  "MainCateogry/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editCategory", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.category;
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

const MainCategorySlice = createSlice({
  name: "MainCateogry",
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
      FireToast("success", "Category Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeMainCategory.fulfilled, (state, action) => {
      FireToast("warning", "Category Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Category Updated Successfully");
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = MainCategorySlice.actions;
export default MainCategorySlice.reducer;
