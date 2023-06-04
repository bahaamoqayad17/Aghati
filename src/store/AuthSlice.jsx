import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/FireToast";

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const res = await axios.post("login", user);
    return res.data;
  } catch (error) {
    FireToast("error", error.response?.data?.message[0]);
    return rejectWithValue(error);
  }
});

const initialState = {
  user: {},
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.data;
      state.isLoggedIn = true;
      FireToast("success", "Logged In Successfully");
    });
  },
});

export default AuthSlice.reducer;
