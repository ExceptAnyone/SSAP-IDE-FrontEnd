import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder } from "../../../fileSlice/FileSlice";
import axios from "axios";
import { useMutation } from "react-query";
import { createFileAPI } from "../../../../../api/ideAPI/createFileAPI";
import { saveAsAPI } from "../../../../../api/ideAPI/saveAsAPI";
import { createFolderAPI } from "../../../../../api/ideAPI/createFolderAPI";
import { saveFileAPI } from "../../../../../api/ideAPI/saveFileAPI";
import { editFileNameAPI } from "../../../../../api/ideAPI/editFileNameAPI";
import { updateFolderNameAPI } from "../../../../../api/ideAPI/folderEditAPI";
import { deleteFolderAPI } from "../../../../../api/ideAPI/deleteFolderAPI";
import { deleteFileAPI } from "../../../../../api/ideAPI/deleteFileAPI";

export default function useFileAction() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const selectFileId = useSelector((state) => state.file.selectFileId);
  const [saveStatus, setSaveStatus] = useState(null);
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.file.data);

  // const createFileMutation = useMutation(createFileAPI, {
  //   onError: (error) => {
  //     console.error("파일 생성 에러:", error);
  //   },
  //   onSuccess: (data) => {
  //     console.log("새 파일 생성 성공:", data);
  //     // 리덕스나 로컬 상태 업데이트 로직 추가
  //     const newFileData = {
  //       id: Date.now().toString(),
  //       parent: selectFileId || 0,
  //       droppable: false,
  //       text: data.fileName,
  //       // data: {
  //       //   fileType: "text", // 기본 파일 타입 "text" TODO
  //       //   path: data.Path,
  //       // },
  //     };
  //     dispatch(addFile(newFileData));
  //   },
  // });

  // const createFile = (parentFileId, name, type, ext, path, content) => {
  //   createFileMutation.mutate({
  //     containerId: "exampleContainerId", // TODO: 실제 containerId로 교체
  //     parentFileId,
  //     name,
  //     type,
  //     ext,
  //     path,
  //     content,
  //   });
  // };

  // TODO 모킹데이터를 이용한 새 파일 생성
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

  const createFolderMutation = useMutation(createFolderAPI, {
    onError: (error) => {
      console.error("폴더 생성 에러:", error);
    },
    onSuccess: (data) => {
      console.log("새 폴더 생성 성공:", data);
      console.log("selectFileId", selectFileId);
      console.log("fileData", fileData);
      // 리덕스나 로컬 상태 업데이트 로직 추가
      const newFolderData = {
        id: 1,
        parent: selectFileId || 0,
        droppable: true,
        text: "newFolder",

        // data: {
        //   fileType: "folder", // 폴더 타입 지정
        //   path: data.Path,
        // },
      };
      console.log("selectFileId", selectFileId);
      console.log("fileData", fileData);

      dispatch(addFolder(newFolderData));
      console.log("selectFileId", selectFileId);
      console.log("fileData", fileData);
      console.log("newFolderData", newFolderData);
    },
  });

  const createFolder = (path, folderName) => {
    console.log("folderName", folderName);
    console.log("parentId", selectFileId);

    createFolderMutation.mutate({
      parentFolderId: selectFileId || 0, // 선택된 파일 or 폴더의 ID
      name: "newFolder",
      type: false, // 폴더 타입 지정
      path: "/hello/hello2",
    });
  };

  // const createFolder = () => {
  //   //폴더 생성 모킹 데이터 TODO 추후 삭제
  //   const mockCreateFolderResponse = {
  //     status: 201,
  //     message: "폴더 생성 성공",
  //     data: {
  //       id: Date.now().toString(), // 유니크한 폴더 ID
  //       name: "newFolder",
  //       path: "/current/path/newFolder",
  //       created_at: "2023-09-27T12:00:00Z",
  //     },
  //   };

  //   // mockCreateFolderResponse를 사용하여 폴더 생성 로직을 시뮬레이션
  //   const response = mockCreateFolderResponse;

  //   if (response.status === 201) {
  //     const newFolderData = {
  //       id: response.data.id,
  //       parent: selectFileId || 0,
  //       droppable: true,
  //       text: response.data.name, // 여기에 폴더의 이름을 지정
  //       type: "folder",
  //     };
  //     dispatch(addFolder(newFolderData)); // 리덕스 스토어 업데이트
  //   } else {
  //     alert(response.message);
  //   }
  // };

  const saveFileMutation = useMutation(saveFileAPI, {
    onError: (error) => {
      console.error("파일 저장 에러:", error);
    },
    onSuccess: (data) => {
      console.log("파일 저장 성공:", data);
      setSaveStatus("success");
    },
    onMutate: () => {
      setSaveStatus("pending");
    },
  });

  const saveFile = (fileId, path, fileName, content) => {
    saveFileMutation.mutate({
      containerId: "exampleContainerId", // TODO: 실제 containerId로 교체
      fileId,
      path,
      fileName,
      content,
    });
  };
  // const saveFile = async (fileData) => {
  //   try {
  //     // 가상의 모킹 데이터로 응답 TODO
  //     const mockResponse = {
  //       status: 200,
  //       message: "File saved successfully!",
  //       data: {
  //         ...fileData,
  //         id: Date.now().toString(), // 예시로 파일에 대한 고유 ID를 생성
  //       },
  //     };

  //     // 200 상태 코드를 통해 성공적으로 처리되었다고 가정
  //     if (mockResponse.status === 200) {
  //       setSaveStatus("success");
  //       console.log("File saved (mock):", mockResponse.data);
  //       return mockResponse.data; // 혹은 원하는 데이터 반환
  //     } else {
  //       setSaveStatus("failed");
  //       throw new Error(mockResponse.message);
  //     }
  //   } catch (error) {
  //     setSaveStatus("failed");
  //     console.error("Error saving the file:", error);
  //     throw error;
  //   }
  // };

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

  const editFolderNameMutation = useMutation(updateFolderNameAPI, {
    onError: (error) => {
      console.error("폴더 이름 수정 에러:", error);
    },
    onSuccess: (data) => {
      console.log("폴더 이름 수정 성공:", data.message);
      // 리덕스 상태 업데이트 로직 추가 TODO
    },
  });

  const editFolderName = (newName) => {
    editFolderNameMutation.mutate({
      newFolderName: newName,
    });
  };

  const editFileName = (fileId, newName) => {
    editFileNameMutation.mutate({
      fileId,
      newName,
      // 다른 필요한 인자들 추가...TODO
    });
  };

  const editFileNameMutation = useMutation(editFileNameAPI, {
    onError: (error) => {
      console.error("파일 이름 수정 에러:", error);
    },
    onSuccess: (data) => {
      console.log("파일 이름 수정 성공:", data);
      // 필요한 경우, 리덕스나 로컬 상태 업데이트 로직 추가 TODO
    },
  });

  /////////////////delete 관련
  const deleteFolderMutation = useMutation(deleteFolderAPI, {
    onError: (error) => {
      console.error("폴더 삭제 에러:", error);
    },
    onSuccess: (data) => {
      console.log("폴더 삭제 성공:", data.message);
      // 리덕스나 로컬 상태 업데이트 로직 추가 TODO
    },
  });

  const deleteFolder = (folderId) => {
    deleteFolderMutation.mutate(folderId);
  };

  const deleteFileMutation = useMutation(deleteFileAPI, {
    onError: (error) => {
      switch (error.message) {
        case "파라미터 필수 항목이 누락되었거나 형식이 잘못되었습니다.":
          console.error("파일 삭제 에러: 잘못된 파라미터");
          break;
        case "해당 파일을 삭제할 권한이 없습니다.":
          console.error("파일 삭제 권한이 없습니다.");
          break;
        case "지정된 경로에 해당하는 파일이 존재하지 않습니다.":
          console.error("파일 삭제 에러: 파일을 찾을 수 없습니다.");
          break;
        default:
          console.error("파일 삭제 중 알 수 없는 오류가 발생했습니다.", error);
          break;
      }
    },
    onSuccess: (data) => {
      console.log("파일 삭제 성공:", data.message);
      //리덕스 상태 업데이트 로직 추가 TODO
    },
  });

  const deleteFile = (fileId, path, fileName) => {
    deleteFileMutation.mutate({
      containerId: "exampleContainerId", // TODO: 실제 containerId로 교체
      fileId,
      path,
      fileName,
    });
  };

  return {
    createFile,
    createFolder,
    selectFileId,
    saveFile,
    saveStatus,
    onSaveAs,
    editFileName,
    editFolderName,
    deleteFolder,
    deleteFile,
  };
}
