//폴더 생성시 api 호출 함수
import axios from "axios";

export const createFolderAPI = async ({
  containerId,
  parentFolderId,
  name,
  type,
  path,
}) => {
  const API_URL = `http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/ide/9271b06b-34f3-49ef-b311-776d3bbc2df3/folders`;

  try {
    const response = await axios.post(API_URL, {
      parentFolderId,
      name,
      type,
      path,
    });

    if (response.status === 201) {
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
          throw new Error("해당 경로에 폴더를 생성할 권한이 없습니다.");
        case 404:
          throw new Error(
            "지정된 containerId에 해당하는 컨테이너가 존재하지 않습니다.",
          );
        case 409:
          throw new Error("동일한 이름의 폴더가 이미 해당 경로에 존재합니다.");
        case 500:
        default:
          throw new Error("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
      }
    } else {
      throw error; // axios 외부의 오류 처리 (예: 네트워크 오류)
    }
  }
};
