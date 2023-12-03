import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "./HeaderMenubar.css";
import File from "./file/File";
import Project from "./project/Project";
import User from "./user/User";
import SharedLink from "./sharedLink/SharedLink";
import Setting from "./setting/Setting";

const HeaderMenubar = () => {
  return (
    <Menubar.Root className="MenubarRoot">
      <div className="menu-left">
        <File />
        <Project />
      </div>
      <div className="menu-right">
        <User />
        <SharedLink />
        <Setting />
      </div>
    </Menubar.Root>
  );
};

export default HeaderMenubar;
