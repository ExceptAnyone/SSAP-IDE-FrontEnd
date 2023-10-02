import axios from "axios";

export const saveAsAPI = async (
  containerId,
  fileId,
  path,
  fileName,
  content,
) => {
  const API_URL = `/ide/${containerId}/files/${fileId}/save-as`;

  const response = await axios.post(API_URL, {
    path,
    fileName,
    content,
  });

  return response.data;
};
