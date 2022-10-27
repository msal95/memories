import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import postReducer from "../reducers/posts";

export const store = configureStore({
  reducer: {
    memory: postReducer,
    auth: authReducer,
  },
});
