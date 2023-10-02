import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder } from "../../../fileSlice/FileSlice";
import axios from "axios";
import { useMutation } from "react-query";
import { createFileAPI } from "../../../../../api/ideAPI/createFileAPI";
import { saveAsAPI } from "../../../../../api/ideAPI/saveAsAPI";

export default function useFileAction() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const selectFileId = useSelector((state) => state.file.selectFileId);
  const [saveStatus, setSaveStatus] = useState(null);
  const dispatch = useDispatch();

  const createFileMutation = useMutation(createFileAPI, {
    onError: (error) => {
      console.error("파일 생성 에러:", error);
    },
    onSuccess: (data) => {
      console.log("새 파일 생성 성공:", data);
      // 리덕스나 로컬 상태 업데이트 로직 추가
      const newFileData = {
        id: Date.now().toString(),
        parent: selectFileId || 0,
        droppable: false,
        text: data.fileName,
        data: {
          fileType: "text", // 기본 파일 타입 "text"
          path: data.Path,
        },
      };
      dispatch(addFile(newFileData));
    },
  });

  const createFile = (path, fileName) => {
    createFileMutation.mutate({
      containerId: "exampleContainerId", // TODO: 실제 containerId로 교체
      path,
      fileName,
    });
  };

  // TODO 모킹데이터를 이용한 파일 생성
  // const createFile = () => {
  //   // 모킹 데이터 TODO
  //   const mockResponse = {
  //     status: 201,
  //     message: "파일 생성",
  //     data: {
  //       Path: "/example/path",
  //       fileName: "NewFile",
  //     },
  //   };

  //   const newFileData = {
  //     id: Date.now().toString(), // 유니크한 ID 생성 (실제로는 다른 방식으로 생성해야 함)
  //     parent: selectFileId || 0, // 선택된 폴더가 있으면 그 폴더에 추가, 없으면 최상위에 추가
  //     droppable: false,
  //     text: "New File",
  //     data: {
  //       fileType: "text", // TODO 기본 파일 타입 "text"
  //     },
  //   };
  //   console.log("newFileData", newFileData);
  //   dispatch(addFile(newFileData));

  //   if (mockResponse.status === 201) {
  //     // 폴더 생성 성공시 화면에 폴더 추가
  //     setFiles((prevFiles) => {
  //       const newFiles = [
  //         ...prevFiles,
  //         {
  //           path: mockResponse.data.Path,
  //           fileName: mockResponse.data.fileName,
  //         },
  //       ];
  //       console.log("Updated file:", newFiles); // TODO 추후 삭제
  //       return newFiles;
  //     });
  //   } else {
  //     // 다른 상태 코드에 따른 처리 로직
  //     alert(mockResponse.message);
  //   }
  // };

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
  };

  const onSaveAs = async (newFileName, currentFilePath, currentFileContent) => {
    try {
      const response = await saveAsAPI(
        "exampleContainerId", // TODO: 실제 containerId로 교체
        selectFileId, // 현재 선택된 파일의 ID
        currentFilePath,
        newFileName,
        currentFileContent,
      );

      if (response.status === 200) {
        console.log("파일이 성공적으로 복제되었습니다:", response.data);
        // 필요하면 여기서 추가적인 상태 업데이트 또는 로직 수행
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("다른 이름으로 파일 저장 실패:", error.message);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("파라미터 필수 항목이 누락되었거나 형식이 잘못되었습니다.");
            break;
          case 403:
            alert("해당 파일을 변경할 권한이 없습니다.");
            break;
          case 404:
            alert(
              "원본 파일을 찾을 수 없어 다른 이름으로 파일 저장이 불가능 합니다.",
            );
            break;
          case 409:
            alert("동일한 이름의 파일이 이미 해당 경로에 존재합니다.");
            break;
          case 500:
          default:
            alert("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
            break;
        }
      }
    }
  };

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

  return {
    createFile,
    createFolder,
    selectFileId,
    saveFile,
    saveStatus,
    onSaveAs,
  };
}
