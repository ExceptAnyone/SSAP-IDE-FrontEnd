import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { API_ENDPOINT } from "../../api/chatAPI";
import { BiSearch, BiSolidUser } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import "./chat.scss";

const Chat = ({ roomId }) => {
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [newMessageArrived, setNewMessageArrived] = useState(false);

  // TEST: 페이지 접속시 사용자 입력 받기
  // TODO: 추후 유저 정보 받아서 작업 예정
  useEffect(() => {
    if (!userName) {
      const inputUserName = prompt("이름을 입력해주세요.:");
      if (inputUserName) setUserName(inputUserName);
      console.log(inputUserName);
    }
  }, []);

  // 채팅창 열림 여부 최신 상태 업뎃 유지
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
    console.log("isVisible:", isVisible); // isVisible 상태 확인용
  }, [isVisible]);

  // 소켓
  useEffect(() => {
    if (!userName) return;

    // Socket.IO 클라이언트 초기화
    socketRef.current = socketIOClient(API_ENDPOINT);

    socketRef.current.emit("setUsername", userName);
    socketRef.current.emit("joinRoom", roomId);

    // 서버로부터 메시지를 받으면 상태 업데이트
    socketRef.current.on("receiveMessage", (msg) => {
      // 본인 확인
      const isOwner = msg.socketId === socketRef.current.id;

      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log("isOwner:", isOwner, "isVisible:", isVisible);

      // 새로운 메세지 도착하면 알림
      if (!isOwner && !isVisibleRef.current) {
        setNewMessageArrived(true);
      }
    });

    // 소켓 연결 종료
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userName]);

  // 메세지 엡뎃 확인용
  useEffect(() => {
    console.log(
      "Updated messages:",
      messages,
      "UpdatednewMessageArrived:",
      newMessageArrived,
    );
  }, [messages, newMessageArrived]);

  // 채팅창 열기
  const handleToggleChat = () => {
    setNewMessageArrived(false);
    setIsVisible((prevIsVisible) => !prevIsVisible); // isVisible 상태 토글
  };

  // 채팅 메세지 전송
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
    <div className="chat_container">
      {isVisible && (
        <div className="chat-inner">
          <div className="chat-content">
            <div className="chat-top">
              <h4>채팅</h4>
              <div className="top_right">
                <span>
                  <BiSearch />
                </span>
                <span>
                  <BiSolidUser />
                </span>
              </div>
            </div>
            <div className="msg-wrap">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.socketId === socketRef.current.id
                      ? "msg_right"
                      : "msg_left"
                  }`}
                >
                  {message.socketId === socketRef.current.id ? (
                    ""
                  ) : (
                    <strong>{message.userName}</strong>
                  )}
                  <span>{message.content}</span>
                </div>
              ))}
            </div>
            <div className="msg-form">
              <textarea
                value={newMessage}
                autofocus="true"
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button onClick={handleSendMessage}>전송</button>
            </div>
          </div>
        </div>
      )}
      <button className="chat-button" onClick={handleToggleChat}>
        <BsChatSquareDots />
        {newMessageArrived && <span className="notification">!</span>}
      </button>
    </div>
  );
};

export default Chat;
