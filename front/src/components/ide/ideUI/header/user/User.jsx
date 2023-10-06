import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "../HeaderMenubar.css";

export default function User() {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">사람</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-14}
        >
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem inset">
            이거 <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem inset">
            클릭하면 <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem inset">
            공유된 링크 타고 들어온
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem inset">
            유저 목록 보여줌
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
