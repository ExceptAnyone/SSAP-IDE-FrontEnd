// FileSlice.jsx
import { createSlice, current } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: [],
    selectFileId: null,
    editingFileId: null, // 현재 편집 중인 파일 id
    editingFileContent: "", //현재 편집 중인 파일의 내용
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
    setCurrentEditingFile: (state, action) => {
      console.log("setCurrentEditingFile action called with:", action.payload); //TODO 추후 삭제
      state.editingFileId = action.payload.id;
      state.editingFileContent = action.payload.content;
    },
    updateFileContent: (state, action) => {
      console.log("updateFileContent action.payload:", action.payload); //TODO 추후 삭제
      const { id, content } = action.payload;
      const targetFile = state.data.find((file) => file.id === id);
      console.log("Found target file :", targetFile); //TODO 추후 삭제

      if (targetFile) {
        console.log("파일 업데이트", content); //TODO 추후 삭제
        targetFile.content = content;
      }
    },
    updateFileName: (state, action) => {
      //폴더/파일 이름 수정
      const { id, newName } = action.payload;
      const fileOrFolder = state.data.find((item) => item.id === id);
      if (fileOrFolder) {
        fileOrFolder.text = newName;
      }
    },
  },
});

export const {
  setTreeData,
  addFile,
  addFolder,
  deleteFileOrFolder,
  selectFile,
  setCurrentEditingFile,
  updateFileContent,
  updateFileName,
} = fileSlice.actions;

export default fileSlice.reducer;
