import React, { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "../HeaderMenubar.css";

export default function File() {
  // 화면에 표시될 폴더 목록 상태
  const [folders, setFolders] = useState([]);

  const createFolder = () => {
    // 모킹 데이터
    const mockResponse = {
      status: 201,
      message: "폴더 생성",
      data: {
        Path: "/example/path",
        folderName: "NewFolder",
      },
    };

    if (mockResponse.status === 201) {
      // 폴더 생성 성공시 화면에 폴더 추가
      setFolders((prevFolders) => {
        const newFolders = [
          ...prevFolders,
          {
            path: mockResponse.data.Path,
            folderName: mockResponse.data.folderName,
          },
        ];
        console.log("Updated folders:", newFolders); // 이 부분을 추가
        return newFolders;
      });
    } else {
      // 다른 상태 코드에 따른 처리 로직
      alert(mockResponse.message);
    }
  };

  //추후 주석된 코드로 변경 예정
  // const createFolder = async () => {
  //   const API_URL = "/ide/containerId/folders";
  //   const requestData = {
  //     path: "여기에_경로_입력",
  //     folderName: "여기에_폴더_이름_입력",
  //   };

  //   try {
  //     const response = await axios.post(API_URL, requestData);

  //     if (response.status === 201) {
  //       setFolders((prevFolders) => [
  //         ...prevFolders,
  //         {
  //           path: response.data.Path,
  //           folderName: response.data.folderName,
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
                <Menubar.Item className="MenubarItem" onSelect={createFolder}>
                  새 파일
                </Menubar.Item>
                <Menubar.Item className="MenubarItem">새 폴더</Menubar.Item>
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
