// import { useMutation } from "react-query";
// import axios from "axios";

// export const saveFile = async ({
//   containerId,
//   fileId,
//   path,
//   fileName,
//   content,
// }) => {
//   const url = `/ide/${containerId}/files/${fileId}`;
//   const response = await axios.put(url, {
//     path,
//     fileName,
//     content,
//   });

//   if (response.status !== 200) {
//     throw new Error(response.data.message);
//   }
//   return response.data;
// };

// export const useSaveFile = () => {
//   return useMutation(saveFile, {
//     onError: (error) => {
//       alert(error.message);
//     },
//     onSuccess: (data) => {
//       alert(data.message);
//     },
//   });
// };
