const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React 앱의 주소
    methods: ["GET", "POST"],
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

// 소켓 연결 설정
io.on("connection", (socket) => {
  console.log("소켓 접속 완료");

  // 클라이언트로부터 메세지를 받았을 때
  socket.on("send_message", (message) => {
    chatHistory.push(message); // 채팅 기록에 메세지 저장

    // 모든 클라이언트에게 새로운 메세지 전송
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("소켓 접속 해제");
  });
});

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
