//파일 이름 수정

import axios from "axios";

export const editFileNameAPI = async ({
  containerId,
  fileId,
  path,
  fileName,
}) => {
  const API_URL = `/ide/${containerId}/files/${fileId}/name`;

  try {
    const response = await axios.patch(API_URL, { path, fileName });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          if (error.response.data.message.includes("문자나 문자열")) {
            throw new Error(
              "파일명에 사용할 수 없는 문자나 문자열이 포함되어 있습니다.",
            );
          }
          throw new Error(
            "파라미터 필수 항목이 누락되었거나 형식이 잘못되었습니다.",
          );
        case 404:
          throw new Error(
            "지정된 경로 또는 해당하는 파일이 존재하지 않습니다.",
          );
        case 409:
          throw new Error("파일 이름이 이미 존재하는 다른 파일과 충돌합니다.");
        case 500:
        default:
          throw new Error("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
      }
    } else {
      throw error; // network error 등 axios 외부의 오류에 대한 처리
    }
  }
};
