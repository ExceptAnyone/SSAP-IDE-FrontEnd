import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { API_ENDPOINT, getMessages, sendMessage } from "../../api/chatAPI";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSearch, BiSolidUser } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import "./chat.scss";
import ChatUserList from "./chatUserList/ChatUserList";
import { useMutation, useQuery, useQueryClient } from "react-query";

// TODO 컨테이너 고유ID를 roomID로 적용시켜야함
const roomId =
  "aa0cea7dcd81cbea0fe690aa72b8520b6dfce49e35e418c0a0c32f88f24a105";
// const user = { email: "mater@gmail.com", name: "master" };
// ssap@naver.com ssap1234!

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("chatUser"));
  console.log("chatUser", user);
  const name = user?.name;
  const email = user?.email;

  // const [users, setUsers] = useState([]);
  // const [userName, setUserName] = useState(user.name);
  // const [userEmail, setUserEmail] = useState(user.name);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [newMessageArrived, setNewMessageArrived] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const queryClient = useQueryClient();
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
  // console.log("getMessages", chatData);

  //TODO
  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: (data) => {
      // 메시지 전송에 성공하면 데이터를 재요청
      queryClient.invalidateQueries(["getMessages", roomId]);
      console.log("메세지 저장 성공:", data);
    },
    onError: (error) => {
      console.error("메세지 저장 실패:", error);
    },
  });

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
    console.log("setUserInfo: ", email, name);

    socket.emit("joinRoom", roomId, email);

    // 서버로부터 메시지를 받으면 상태 업데이트
    const onReceiveMessage = (data) => {
      const { name, message } = data;
      setMessages((prevMessages) => [...prevMessages, { name, message }]);

      // 본인 확인
      const isOwner = data.email === email;
      console.log("data.email:", data.email, "userEmail", email);
      console.log("isOwner:", isOwner, "isVisible:", isVisible);

      // 새로운 메세지 도착하면 알림
      if (!isOwner && !isVisibleRef.current) {
        setNewMessageArrived(true);
        queryClient.invalidateQueries("getMessages"); // 새로운 메세지 도착시 채팅 내용 가져오기
      }
    };

    socket.on("receiveMessage", (data) => {
      onReceiveMessage(data);
      queryClient.invalidateQueries("getMessages");
    }); // TODO: 수정됨

    socketRef.current = socket;

    // 소켓 연결 종료
    return () => {
      socket.off("receiveMessage", onReceiveMessage);
      socketRef.current.disconnect();
    };
  }, [roomId, email, name]);

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
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (message.trim() === "") return;

    const data = { email, name, message };
    console.log("handleSendMessage: ", data);

    try {
      const result = await sendMessageMutation.mutateAsync(data);
      if (result.success) {
        setMessage("");
      }
    } catch (error) {
      console.error("메세지 전송 오류:", error);
    }
  };

  // textarea 엔터 키 전송
  const handleTextareaKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 채팅창 열림 여부 최신 상태 업뎃 유지
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
    console.log("isVisible:", isVisible); // isVisible 상태 확인용
  }, [isVisible]);

  // 접속자 창 toggle
  const toggleUserList = () => {
    setShowUserList((prev) => !prev);
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
                <span onClick={toggleUserList}>
                  <BiSolidUser />
                </span>
              </div>
            </div>
            <div className="msg-wrap">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.email === email ? "msg_right" : "msg_left"
                  }`}
                >
                  {msg.email === email ? "" : <strong>{msg.name}</strong>}

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
          {showUserList && <ChatUserList userName={name} />}
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
