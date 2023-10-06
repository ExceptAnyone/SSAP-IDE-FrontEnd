import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "../HeaderMenubar.css";

export default function SharedLink() {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">공유링크</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-14}
        >
          <Menubar.Item className="MenubarItem inset">
            공유링크 복사
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
