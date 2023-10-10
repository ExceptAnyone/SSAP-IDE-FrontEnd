import axios from "axios";

const API_ENDPOINT = "http://localhost:5012";
// const API_ENDPOINT =
//   "http://Chat-env.eba-pbveipzf.ap-northeast-2.elasticbeanstalk.com";

// 메세지 저장 API 호출
const sendMessage = async (data) => {
  console.log("sendMessageAPI: ", data.email, data.name, data.message);

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/chat/sendMessage`,
      data,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("sendMessage API 요청 실패:", error);
    throw new Error("sendMessage API 요청을 수행하지 못했습니다");
  }
};

// 메시지 불러오기 API 호출
const getMessages = async (roomId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/chat/getMessages`, {
      params: { roomId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("getMessages API 요청 실패:", error);
    throw new Error("getMessages API 요청을 수행하지 못했습니다");
  }
};

export { API_ENDPOINT, sendMessage, getMessages };
