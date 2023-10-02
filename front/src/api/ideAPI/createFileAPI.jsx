// api/fileAPI.jsx
import axios from "axios";

export const createFileAPI = async ({ containerId, path, fileName }) => {
  const API_URL = `/ide/${containerId}/files`;
  const response = await axios.post(API_URL, { path, fileName });

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  return response.data;
};
