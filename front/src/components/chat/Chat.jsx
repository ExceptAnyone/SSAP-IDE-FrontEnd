import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

export const API_ENDPOINT = "http://localhost:5002";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(API_ENDPOINT);

    socketRef.current.on("receive_message", (receivedMessage) => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        receivedMessage,
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("send_message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
