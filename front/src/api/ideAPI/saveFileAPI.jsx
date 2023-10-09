// 저장 클릭시 api 호출 함수
import axios from "axios";

export const saveFileAPI = async ({
  containerId,
  fileId,
  path,
  fileName,
  content,
}) => {
  const API_URL = `/ide/${containerId}/files/${fileId}`;

  try {
    const response = await axios.put(API_URL, { path, fileName, content });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "파라미터 필수 항목이 누락되었거나 형식이 잘못되었습니다.",
          );
        case 404:
          throw new Error(
            "지정된 경로 또는 해당하는 파일이 존재하지 않습니다.",
          );
        case 409:
          throw new Error("동일한 이름의 파일이 이미 해당 경로에 존재합니다.");
        case 500:
        default:
          throw new Error("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
      }
    } else {
      throw error; // network error 등 axios 외부의 오류에 대한 처리
    }
  }
};
