import React from "react";
import * as Menubar from "@radix-ui/react-menubar";

import "../HeaderMenubar.css";

export default function Setting() {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">톱니바퀴</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Sub>
            <Menubar.SubTrigger className="MenubarSubTrigger">
              컨테이너 설정
              <div className="RightSlot"></div>
            </Menubar.SubTrigger>
            <Menubar.Portal>
              <Menubar.SubContent
                className="MenubarSubContent"
                alignOffset={-5}
              ></Menubar.SubContent>
            </Menubar.Portal>
          </Menubar.Sub>
          <Menubar.Separator className="MenubarSeparator" />

          <Menubar.Item className="MenubarItem">
            컨테이너 나가기 <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />

          <Menubar.Item className="MenubarItem">로그아웃</Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
