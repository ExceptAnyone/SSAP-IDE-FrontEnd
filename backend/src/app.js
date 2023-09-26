const express = require("express"); // 웹서버 프레임워크
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

// 서버 및 소켓 초기화
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 서버 연결 확인..
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// JSON 요청 본문 파싱을 위한 미들웨어
app.use(express.json());
// CORS 설정
app.use(cors());

// 채팅 저장 공간
const chatHistory = [];

app.get("/chatHistory", (req, res) => {
  console.log("sendMessage", chatHistory);
  res.status(200).send(chatHistory);
});

// 소켓 연결 설정
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("setUsername", (userName) => {
    if (!socket) {
      console.error("Socket is undefined!");
      return;
    }
    if (typeof userName === "undefined") {
      console.error("userName is undefined!");
      return;
    }

    socket.username = userName;
    console.log(`Username set to ${userName}`);
  });

  // 컨테이너 고유의 room에 조인
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User with socket ID ${socket.id} joined room: ${roomId}`);
  });

  // 메시지 수신 및 해당 room에 보내기
  socket.on("sendMessage", (roomId, message) => {
    console.log("Received message:", message);
    chatHistory.push(message);

    io.to(roomId).emit("receiveMessage", message);
    console.log("Received chatHistory:", chatHistory);
  });

  socket.on("disconnect", () => {
    console.log(`User with socket ID ${socket.id}`);
  });
});

// 서버 연결
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
