import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signin, signup } from "../api";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ userData }) => {
    console.log("🚀 ~ file: auth.js ~ line 14 ~ userData", userData);

    try {
      const res = await signup(userData);

      localStorage.setItem("profile", JSON.stringify(res.data));
      console.log("🚀 ~ file: auth.js/Reducer ~ line 16 ~ res", res);
      return res;
    } catch (error) {
      throw new error();
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signup",
  async ({ userData }) => {
    console.log("🚀 ~ file: auth.js ~ line 14 ~ userData", userData);

    try {
      const res = await signin(userData);

      console.log("🚀 ~ file: auth.js/Reducer ~ line 16 ~ res", res);

      localStorage.setItem("profile", JSON.stringify(res.data));
      return res;
    } catch (error) {
      throw new error();
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleAuth: (state, { payload }) => {
      localStorage.setItem("profile", JSON.stringify(payload));
      // state.data = payload.data;
      return payload;
    },
    logoutUser: (state, { payload }) => {
      localStorage.clear();
      return payload;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: auth.js ~ line 62 ~ payload", payload);

      state.loading = false;
      state.data = payload.data;
      // return payload;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
    [signInUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: auth.js ~ line 74 ~ payload", payload);

      state.loading = false;
      state.data = payload.data;
      // return payload;
    },
    [signInUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

export const { googleAuth, logoutUser } = authReducer.actions;

export default authReducer.reducer;
