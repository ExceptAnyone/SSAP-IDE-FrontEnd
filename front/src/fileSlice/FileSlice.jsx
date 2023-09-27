import { createSlice } from "@reduxjs/toolkit";
import initialData from "../ideUI/sideBar/sample-data.json";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: initialData,
    selectFileId: null, // 현재 선택된 아이템의 ID
  },
  reducers: {
    addFile: (state, action) => {
      const newItem = {
        ...action.payload,
        type: "file", // 기본값은 파일로 설정
      };
      state.data.push(newItem);
    },
    addFolder: (state, action) => {
      const newItem = {
        ...action.payload,
        type: "folder",
        droppable: true,
      };
      state.data.push(newItem);
    },
    selectFile: (state, action) => {
      state.selectFileId = action.payload;
    },
  },
});

export const { addFile, addFolder, selectFile } = fileSlice.actions;

export default fileSlice.reducer;
