import React from "react";
import * as Menubar from "@radix-ui/react-menubar";

import "../HeaderMenubar.css";
import { GearIcon } from "@radix-ui/react-icons";
import { Link } from "@mui/material";

export default function Setting() {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="MenubarTrigger">
        <GearIcon />
      </Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Separator className="MenubarSeparator" />

          <Menubar.Item className="MenubarItem">
            <Link to="/" className="WhiteTextLink">
              컨테이너 나가기
            </Link>
            <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />

          <Menubar.Item className="MenubarItem">로그아웃</Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
