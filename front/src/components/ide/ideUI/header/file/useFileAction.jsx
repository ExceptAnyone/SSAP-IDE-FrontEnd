import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder } from "../../../fileSlice/FileSlice";

export default function useFileAction() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const selectFileId = useSelector((state) => state.file.selectFileId);

  const dispatch = useDispatch();

  const createFile = () => {
    // 모킹 데이터 TODO
    const mockResponse = {
      status: 201,
      message: "파일 생성",
      data: {
        Path: "/example/path",
        fileName: "NewFile",
      },
    };

    const newFileData = {
      id: Date.now().toString(), // 유니크한 ID 생성 (실제로는 다른 방식으로 생성해야 함)
      parent: selectFileId || 0, // 선택된 폴더가 있으면 그 폴더에 추가, 없으면 최상위에 추가
      droppable: false,
      text: "New File",
      data: {
        fileType: "text", // TODO 기본 파일 타입 "text"
      },
    };
    console.log("newFileData", newFileData);
    dispatch(addFile(newFileData));

    if (mockResponse.status === 201) {
      // 폴더 생성 성공시 화면에 폴더 추가
      setFiles((prevFiles) => {
        const newFiles = [
          ...prevFiles,
          {
            path: mockResponse.data.Path,
            fileName: mockResponse.data.fileName,
          },
        ];
        console.log("Updated file:", newFiles); // TODO 추후 삭제
        return newFiles;
      });
    } else {
      // 다른 상태 코드에 따른 처리 로직
      alert(mockResponse.message);
    }
  };

  const createFolder = () => {
    //모킹 데이터 TODO 추후 삭제
    const mockCreateFolderResponse = {
      status: 201,
      message: "폴더 생성 성공",
      data: {
        id: Date.now().toString(), // 유니크한 폴더 ID
        name: "newFolder",
        path: "/current/path/newFolder",
        created_at: "2023-09-27T12:00:00Z",
      },
    };

    // mockCreateFolderResponse를 사용하여 폴더 생성 로직을 시뮬레이션
    const response = mockCreateFolderResponse;

    if (response.status === 201) {
      const newFolderData = {
        id: response.data.id,
        parent: selectFileId || 0,
        droppable: true,
        text: response.data.name, // 여기에 폴더의 이름을 지정
        type: "folder",
      };
      dispatch(addFolder(newFolderData)); // 리덕스 스토어 업데이트
    } else {
      alert(response.message);
    }
  };
  return { createFile, createFolder };
}
