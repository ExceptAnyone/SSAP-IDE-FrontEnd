import React from "react";
import Chat from "../../components/chat/Chat";

import Layout from "../../components/ide/layout/Layout";
import HeaderMenubar from "../../components/ide/ideUI/header/HeaderMenubar";

export default function IdePage() {
  return (
    <div>
      <HeaderMenubar />
      <Layout />
      {/* <Chat /> TODO 추후에 추가*/}
    </div>
  );
}
