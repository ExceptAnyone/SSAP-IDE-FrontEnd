import React from "react";
import Chat from "../../components/chat/Chat";

import Layout from "../../components/ide/layout/Layout";
import HeaderMenubar from "../../components/ide/ideUI/header/HeaderMenubar";
import "./IdePage.css";
export default function IdePage() {
  return (
    <div>
      <Layout />
      <Chat />
    </div>
  );
}
