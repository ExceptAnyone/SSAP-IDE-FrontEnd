import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import "./CodeEditor.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentEditingFile,
  updateFileContent,
} from "../fileSlice/FileSlice";
import { debounce } from "lodash";

function CodeEditor() {
  const editingFileContent = useSelector(
    (state) => state.file.editingFileContent,
  );
  const editingFileId = useSelector((state) => state.file.editingFileId);
  console.log("editingFileId :", editingFileId);
  const entireState = useSelector((state) => state);
  console.log("entireState", entireState);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("editingFileId has changed to:", editingFileId);
  }, [editingFileId]); //TODO 추후 삭제

  const debouncedUpdate = debounce(({ id, content }) => {
    console.log("Debounced id:", id, "content:", content);
    dispatch(setCurrentEditingFile({ id: id, content: content }));
    dispatch(updateFileContent({ id: id, content: content }));
  }, 300);

  const handleEditorChange = (newValue) => {
    if (typeof newValue !== "string") {
      console.error("Invalid value type:", newValue);
      return;
    }
    debouncedUpdate({ id: editingFileId, content: newValue });
  };

  return (
    <div className="CodeEditor">
      <div className="editor-wrap">
        <Editor
          height="100vh" //TODO 사이즈조절
          defaultLanguage="javascript"
          defaultValue="// 코드를 입력해주세요"
          theme="vs-dark"
          value={editingFileContent || ""}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
