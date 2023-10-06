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
            Undo <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem">
            Redo <div className="RightSlot"></div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Sub>
            <Menubar.SubTrigger className="MenubarSubTrigger">
              Find
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </Menubar.SubTrigger>

            <Menubar.Portal>
              <Menubar.SubContent
                className="MenubarSubContent"
                alignOffset={-5}
              >
                <Menubar.Item className="MenubarItem">
                  Search the web…
                </Menubar.Item>
                <Menubar.Separator className="MenubarSeparator" />
                <Menubar.Item className="MenubarItem">Find…</Menubar.Item>
                <Menubar.Item className="MenubarItem">Find Next</Menubar.Item>
                <Menubar.Item className="MenubarItem">
                  Find Previous
                </Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Portal>
          </Menubar.Sub>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem">Cut</Menubar.Item>
          <Menubar.Item className="MenubarItem">Copy</Menubar.Item>
          <Menubar.Item className="MenubarItem">Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
