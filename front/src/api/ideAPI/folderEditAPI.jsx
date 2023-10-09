// 폴더이름 수정 시 api 호출 함수
import { useMutation } from "react-query";
import axios from "axios";

export const updateFolderNameAPI = async ({
  containerId,
  folderId,
  newPath,
  newFolderName,
}) => {
  const API_URL = `/ide/${containerId}/folders/${folderId}/name`;

  try {
    const response = await axios.patch(API_URL, {
      path: newPath,
      folderName: newFolderName,
    });

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
            "지정된 containerId에 해당하는 컨테이너가 존재하지 않습니다.",
          );
        case 409:
          throw new Error("동일한 이름의 폴더가 이미 해당 경로에 존재합니다.");
        case 500:
        default:
          throw new Error("요청을 처리하는 중에 서버에서 오류가 발생했습니다.");
      }
    } else {
      throw error; // network error 등 axios 외부의 오류에 대한 처리
    }
  }
};

export const useUpdateFolderName = () => {
  return useMutation(updateFolderNameAPI, {
    onError: (error) => {
      console.error("Error updating folder name:", error);
    },
    onSuccess: (data) => {
      console.log("Folder name updated successfully:", data);
    },
  });
};
