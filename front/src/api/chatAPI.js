import axios from "axios";

const API_ENDPOINT = "http://localhost:5012";
// export const API_ENDPOINT =
//   "http://Chat-env.eba-pbveipzf.ap-northeast-2.elasticbeanstalk.com/chat";

// 메세지 저장 API 호출
const sendMessage = async (message) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/chat/getMessages`, {
      // params: { message },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw new Error("API 요청을 수행하지 못했습니다");
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
    console.error("API 요청 실패:", error);
    throw new Error("API 요청을 수행하지 못했습니다");
  }
};

export { API_ENDPOINT, sendMessage, getMessages };
