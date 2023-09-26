import { createSlice } from "@reduxjs/toolkit";
import initialData from "../ideUI/sideBar/sample-default.json";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: initialData,
    selectFileId: null, // 현재 선택된 폴더의 ID
  },
  reducers: {
    addFile: (state, action) => {
      state.data.push(action.payload);
    },
    selectFile: (state, action) => {
      state.selectFileId = action.payload;
    },
  },
});

export const { addFile, selectFile } = fileSlice.actions;

export default fileSlice.reducer;
