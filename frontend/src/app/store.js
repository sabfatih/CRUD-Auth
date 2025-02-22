import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getMeReducer } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    getMe: getMeReducer,
    auth: authReducer,
  },
});

export default store;
