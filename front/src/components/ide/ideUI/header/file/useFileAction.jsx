import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder } from "../../../fileSlice/FileSlice";
import axios from "axios";

export default function useFileAction() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const selectFileId = useSelector((state) => state.file.selectFileId);
  const [saveStatus, setSaveStatus] = useState(null);
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

  const saveFile = async (fileData) => {
    try {
      // 가상의 모킹 데이터로 응답 TODO
      const mockResponse = {
        status: 200,
        message: "File saved successfully!",
        data: {
          ...fileData,
          id: Date.now().toString(), // 예시로 파일에 대한 고유 ID를 생성
        },
      };

      // 200 상태 코드를 통해 성공적으로 처리되었다고 가정
      if (mockResponse.status === 200) {
        setSaveStatus("success");
        console.log("File saved (mock):", mockResponse.data);
        return mockResponse.data; // 혹은 원하는 데이터 반환
      } else {
        setSaveStatus("failed");
        throw new Error(mockResponse.message);
      }
    } catch (error) {
      setSaveStatus("failed");
      console.error("Error saving the file:", error);
      throw error;
    }

    // axios.post 를 이용한 모킹데이터
    // try {
    //   // 모킹 데이터 (실제 백엔드 연결 시 해당 URL을 사용)
    //   const API_URL = "/api/saveFile"; // 가상의 API endpoint
    //   const response = await axios.post(API_URL, fileData);

    //   // 만약 실제로 백엔드와 연동한다면, 백엔드의 응답 형식에 따라 아래 코드를 조정해야 합니다.
    //   if (response.status === 200) {
    //     setSaveStatus("success");
    //     return response.data; // 혹은 원하는 데이터 반환
    //   } else {
    //     setSaveStatus("failed");
    //     throw new Error(response.data.message);
    //   }
    // } catch (error) {
    //   setSaveStatus("failed");
    //   console.error("Error saving the file:", error);
    //   throw error;
    // }
  };
  return { createFile, createFolder, selectFileId, saveFile, saveStatus };
}
