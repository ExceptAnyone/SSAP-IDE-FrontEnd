import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { SaveAsModal } from "./SaveAsModal";
import { useState } from "react";

export function MenuBarComponent({
  onCreateFile,
  onCreateFolder,
  onSave,
  onSaveAs,
}) {
  const [isSaveAsModalOpen, setSaveAsModalOpen] = useState(false);

  const handleOpenSaveAsModal = () => {
    setSaveAsModalOpen(true);
  };

  const handleCloseSaveAsModal = () => {
    setSaveAsModalOpen(false);
  };
  return (
    <>
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
                  <Menubar.Item className="MenubarItem" onSelect={onCreateFile}>
                    새 파일
                  </Menubar.Item>
                  <Menubar.Item
                    className="MenubarItem"
                    onSelect={onCreateFolder}
                  >
                    새 폴더
                  </Menubar.Item>
                  <Menubar.Item className="MenubarItem">
                    텍스트 파일
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="MenubarSeparator" />

            <Menubar.Item className="MenubarItem" onClick={onSave}>
              저장 <div className="RightSlot"></div>
            </Menubar.Item>
            <Menubar.Item
              className="MenubarItem"
              onClick={handleOpenSaveAsModal}
            >
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
      <SaveAsModal
        open={isSaveAsModalOpen}
        onClose={handleCloseSaveAsModal}
        onSaveAs={onSaveAs}
        // onSaveAs는 저장 버튼을 클릭했을 때 관련 api를 호출
      />
    </>
  );
}
