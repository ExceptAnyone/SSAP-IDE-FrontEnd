// FileSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: [], // 초기값은 빈 배열로 설정했습니다.
    selectFileId: null,
  },
  reducers: {
    setTreeData: (state, action) => {
      state.data = action.payload;
    },
    addFile: (state, action) => {
      const newItem = {
        ...action.payload,
        type: "file",
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
    deleteFileOrFolder: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
    selectFile: (state, action) => {
      state.selectFileId = action.payload;
    },
  },
});

export const {
  setTreeData,
  addFile,
  addFolder,
  deleteFileOrFolder,
  selectFile,
} = fileSlice.actions;

export default fileSlice.reducer;
