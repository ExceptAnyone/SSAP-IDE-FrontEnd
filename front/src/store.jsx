import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileSlice/FileSlice";
export const store = configureStore({
  reducer: {
    files: fileReducer,
  },
});
