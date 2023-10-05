import React from "react";
import "../HeaderMenubar.css";
import useFileAction from "./useFileAction";
import { MenuBarComponent } from "./MenuBarComponent";

export default function File() {
  const { createFile, createFolder, saveFile, saveStatus } = useFileAction();

  // 아래는 예시. 실제 필요한 데이터와 구조에 맞게 수정해야 함. TODO
  const handleSave = async () => {
    const fileData = {
      content: "file content here", // 실제 파일의 내용 TODO
      // ... 다른 필요한 데이터
    };

    try {
      await saveFile(fileData);
      console.log("저장 성공!", fileData);
    } catch (error) {
      console.error("저장 에러 발생!", error);
    }
  };
  return (
    <MenuBarComponent
      onCreateFile={createFile}
      onCreateFolder={createFolder}
      onSave={handleSave}
    />
  );
}
