import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { FireToast } from "@/lib/FireToast";
import { closeModal } from "./RootSlice";

export const index = createAsyncThunk(
  "subCateogry/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("allSubCategory", { params });
      return res.data.subCategories;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "subCateogry/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("addSubCategory", item);
      dispatch(index());
      dispatch(closeModal(true));
      return res.data.delivery;
    } catch (error) {
      FireToast("error", error.response?.data?.message[0]);
      return rejectWithValue(error);
    }
  }
);

export const removeSubCategory = createAsyncThunk(
  "subCateogry/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete("deleteSubCategory", {
        data: { SubCategoryId: id },
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
  "subCateogry/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch("editSubCategory", item);
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

const SubCateogrySlice = createSlice({
  name: "SubCateogry",
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
    builder.addCase(removeSubCategory.fulfilled, (state, action) => {
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

export const { startLoading } = SubCateogrySlice.actions;
export default SubCateogrySlice.reducer;
