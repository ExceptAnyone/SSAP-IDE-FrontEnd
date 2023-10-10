import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "../HeaderMenubar.css";

export default function Project() {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">프로젝트</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Item className="MenubarItem">
            파일 탐색 <div className="RightSlot"></div>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
