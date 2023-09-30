// api/folderAPI.jsx
import { useMutation } from "react-query";
import axios from "axios";

const updateFolderNameAPI = async ({
  containerId,
  folderId,
  newPath,
  newFolderName,
}) => {
  const API_URL = `/ide/${containerId}/folders/${folderId}/name`;

  const response = await axios.patch(API_URL, {
    path: newPath,
    folderName: newFolderName,
  });

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
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
