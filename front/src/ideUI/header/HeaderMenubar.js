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
      <File />
      <Project />
      <User />
      <SharedLink />
      <Setting />
    </Menubar.Root>
  );
};

export default HeaderMenubar;
