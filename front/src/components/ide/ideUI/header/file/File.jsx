import React from "react";
import "../HeaderMenubar.css";
import useFileAction from "./useFileAction";
import { MenuBarComponent } from "./MenuBarComponent";

export default function File() {
  const { createFile, createFolder } = useFileAction();

  return (
    <MenuBarComponent onCreateFile={createFile} onCreateFolder={createFolder} />
  );
}
