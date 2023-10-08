import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { API_ENDPOINT, getMessages } from "../../api/chatAPI";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSearch, BiSolidUser, BiSolidBell } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import "./chat.scss";
import ChatUserList from "./chatUserList/ChatUserList";
import { useQuery } from "@tanstack/react-query";

const Chat = ({ roomId, name, email }) => {
  // const [name, setName] = useState(name);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [newMessageArrived, setNewMessageArrived] = useState(false);

  const {
    data: chatData,
    isLoading,
    isError,
  } = useQuery(
    ["getMessages", roomId], // 쿼리 키
    () => getMessages(roomId), // 데이터를 가져오는 함수
    {
      enabled: !!roomId, // roomId가 존재할 때만 활성화
      onSuccess: (data) => {
        setMessages(data);
      },
      retry: 3, // 실패 시 최대 3번 재시도
      retryDelay: (attempt) => Math.min(attempt * 1000, 3000), // 재시도 사이의 지연 시간 설정
    },
  );

  // 채팅창 열림 여부 최신 상태 업뎃 유지
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
    console.log("isVisible:", isVisible); // isVisible 상태 확인용
  }, [isVisible]);

  // 소켓
  useEffect(() => {
    if (!email) return;

    // Socket.IO 클라이언트 초기화
    const socket = socketIOClient(API_ENDPOINT, {
      //cors 체크
      withCredentials: true,
    });

    socket.emit("setUserInfo", {
      email: email,
      name: name,
    });
    console.log(email, name);
    socket.emit("joinRoom", roomId, email);

    // 서버로부터 메시지를 받으면 상태 업데이트
    socket.on("receiveMessage", (data) => {
      console.log("Received message data: ", data);

      const { name, message } = data;
      setMessages((prevMessages) => [...prevMessages, { name, message }]);

      // TODO: 본인 확인 - 수정 필요
      // const isOwner = msg.socketId === socketRef.current.id;
      // console.log("isOwner:", isOwner, "isVisible:", isVisible);

      // TODO: 새로운 메세지 도착하면 알림 - 수정 필요
      // if (!isOwner && !isVisibleRef.current) {
      //   setNewMessageArrived(true);
      // }
    });

    socketRef.current = socket;

    // 소켓 연결 종료
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, name]);

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

  // textarea 엔터 키 전송
  const handleTextareaKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 채팅 메세지 전송
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (message.trim() === "") return;

    const data = { email, name, message };
    socketRef.current.emit("sendMessage", roomId, data);
    console.log("메세지 전송: ", data);
    setMessage("");
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
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.socketId === socketRef.current.id
                      ? "msg_right"
                      : "msg_left"
                  }`}
                >
                  {msg.socketId === socketRef.current.id ? (
                    ""
                  ) : (
                    <strong>{msg.name}</strong>
                  )}

                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="msg-form">
              <form onSubmit={handleSendMessage}>
                <textarea
                  value={message}
                  autoFocus={true}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleTextareaKeyPress}
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
