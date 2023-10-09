import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { API_ENDPOINT } from "../../api/chatAPI";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSearch, BiSolidUser, BiSolidBell } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import "./chat.scss";
import ChatUserList from "./chatUserList/ChatUserList";

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

  // 클라이언트 접속 시간
  const joinTime = new Date();

  // 소켓
  useEffect(() => {
    if (!userName) return;

    // Socket.IO 클라이언트 초기화
    socketRef.current = socketIOClient(API_ENDPOINT, {
      //cors 체크
      withCredentials: true,
    });

    socketRef.current.emit("setUsername", userName);
    socketRef.current.emit("joinRoom", roomId, joinTime);

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

  // TODO: BUG - 마지막글자 두번 전송 됨 수정 필요
  // textarea 엔터 키 전송
  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 채팅 메세지 전송
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (newMessage.trim() === "") return;
    const socketId = socketRef.current.id;
    const messageObject = {
      userName,
      content: newMessage,
    };

    console.log("messageObject", messageObject);
    socketRef.current.emit("sendMessage", roomId, socketId, messageObject);
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
              <form onSubmit={handleSendMessage}>
                <textarea
                  value={newMessage}
                  autoFocus={true}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                ></textarea>
                <button type="submit">전송</button>
              </form>
            </div>
          </div>
          <ChatUserList />
        </div>
      )}
      {/* TODO: 알림 애니메이션 수정 필요 */}
      <button
        className={`chat-button ${isVisible ? "close" : "open"} ${
          newMessageArrived && "bounce-animation"
        }`}
        onClick={handleToggleChat}
      >
        {isVisible ? <IoIosCloseCircleOutline /> : <BsChatSquareDots />}
        {newMessageArrived && <span className="notification">!</span>}
      </button>
    </div>
  );
};

export default Chat;
