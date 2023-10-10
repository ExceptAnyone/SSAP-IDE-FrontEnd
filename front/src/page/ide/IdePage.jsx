import React from "react";
import Chat from "../../components/chat/Chat";

export default function IdePage() {
  // TODO 컨테이너 고유ID를 roomID로 적용시켜야함
  const roomId =
    "aa0cea7dcd81cbea0fe690aa72b8520b6dfce49e35e418c0a0c32f88f24a1056 ";
  // const user = { email: "mater@gmail.com", name: "master" };
  // const user = { email: "mater2@naver.com", name: "master2" };
  const user = { email: "mater3@naver.com", name: "master3" };

  return (
    <div className="ide-container">
      <Chat roomId={roomId} email={user.email} name={user.name} />
    </div>
  );
}
