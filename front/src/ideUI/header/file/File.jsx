import React, { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "../HeaderMenubar.css";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder } from "../../../fileSlice/FileSlice";
export default function File() {
  // 화면에 표시될 폴더 목록 상태
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const dispatch = useDispatch();

  const selectedFileId = useSelector((state) => state.files.selectedFileId);

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
      id: Math.floor(Date.now()), // 유니크한 ID 생성 (실제로는 다른 방식으로 생성해야 함)
      parent: selectedFileId || 0, // 선택된 폴더가 있으면 그 폴더에 추가, 없으면 최상위에 추가
      text: "New File",
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
        console.log("Updated file:", newFiles); // 이 부분을 추가
        return newFiles;
      });
    } else {
      // 다른 상태 코드에 따른 처리 로직
      alert(mockResponse.message);
    }
  };

  const createFolder = () => {
    //모킹 데이터 TODO
    const mockResponse = {
      status: 201,
      message: "폴더 생성",
      data: {
        Path: "/example/path",
        folderName: "newFolder",
      },
    };

    const newFolderData = {
      id: Math.floor(Date.now()),
      parent: selectedFileId || 0,
      droppable: true,
      text: "new Folder",
    };
    console.log("new folder:", newFolderData);

    dispatch(addFolder(newFolderData)); // 리덕스 스토어에 폴더 데이터 추가
    console.log("Current folders state:", folders);
    if (mockResponse.status === 201) {
      //폴더 생성 성공시 화면에 폴더 추가
      setFolders((prevFolders) => [...prevFolders, newFolderData]);
    } else {
      alert(mockResponse.message);
    }
  };

  //추후 주석된 코드로 변경 예정
  // const createFile = async () => {
  //   const API_URL = "/ide/containerId/files";
  //   const requestData = {
  //     path: "여기에_경로_입력",
  //     fileName: "여기에_폴더_이름_입력",
  //   };

  //   try {
  //     const response = await axios.post(API_URL, requestData);

  //     if (response.status === 201) {
  //       setFiles((prevFiles) => [
  //         ...prevFiles,
  //         {
  //           path: response.data.Path,
  //           fileName: response.data.fileName,
  //         },
  //       ]);
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       alert(error.response.data.message);
  //     } else {
  //       alert("요청을 처리하는 중에 오류가 발생했습니다.");
  //     }
  //   }
  // };

  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">파일</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Sub>
            <Menubar.SubTrigger className="MenubarSubTrigger">
              새로 만들기
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </Menubar.SubTrigger>
            <Menubar.Portal>
              <Menubar.SubContent
                className="MenubarSubContent"
                alignOffset={-5}
              >
                <Menubar.Item className="MenubarItem" onSelect={createFile}>
                  새 파일
                </Menubar.Item>
                <Menubar.Item className="MenubarItem" onSelect={createFolder}>
                  새 폴더
                </Menubar.Item>
                <Menubar.Item className="MenubarItem">텍스트 파일</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Portal>
          </Menubar.Sub>
          <Menubar.Separator className="MenubarSeparator" />

          <Menubar.Item className="MenubarItem">
            저장 <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem">
            다른 이름으로 저장
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem">
            이름 변경 <div className="RightSlot"></div>
          </Menubar.Item>

          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem">
            삭제 <div className="RightSlot"></div>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
