import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // authSlice에서 만든 리듀서를 가져옵니다.

export const store = configureStore({
  reducer: {
    auth: authSlice, // authReducer를 스토어에 등록합니다.
  },
});
