import axios from "axios";

// 폴더 삭제 시 api 호출 함수
export const deleteFolderAPI = async (folderId) => {
  const API_URL = `http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/ide/9271b06b-34f3-49ef-b311-776d3bbc2df3/folders/${folderId}`;

  try {
    const response = await axios.delete(API_URL);

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
        case 403:
          throw new Error("해당 폴더를 삭제할 권한이 없습니다.");
        case 404:
          throw new Error("지정된 경로에 해당하는 폴더가 존재하지 않습니다.");
        case 500:
        default:
          throw new Error("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
      }
    } else {
      throw error; // network error 등 axios 외부의 오류에 대한 처리
    }
  }
};
