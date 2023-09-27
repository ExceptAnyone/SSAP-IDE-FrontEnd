import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { API_ENDPOINT } from "../../api/chatAPI";

const Chat = ({ roomId }) => {
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef();

  // test: 페이지 접속시 사용자 입력 받기
  // 추후 유저 정보 받아서 작업 예정
  if (!userName) {
    const inputUserName = prompt("이름을 입력해주세요.:");
    if (inputUserName) setUserName(inputUserName);
    console.log(inputUserName);
  }

  useEffect(() => {
    if (!userName) return;

    // Socket.IO 클라이언트 초기화
    socketRef.current = socketIOClient(API_ENDPOINT);

    socketRef.current.emit("setUsername", userName);
    socketRef.current.emit("joinRoom", roomId);

    // 서버로부터 메시지를 받으면 상태 업데이트
    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log("receiveMessage: ", messages);
    });

    // 소켓 연결 종료
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userName, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const messageObject = {
      userName,
      content: newMessage,
    };

    console.log("messageObject", messageObject);
    socketRef.current.emit("sendMessage", roomId, messageObject);
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
