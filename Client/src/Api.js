// import axios from "axios";

// export const createApi = () => {
//   return {
//     getcodeBlocks: () => {
//       return axios
//         .get(`http://localhost:5000/getData`)
//         .then((res) => res.data.data)
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//     sendNewCode: (blockPressed) => {
//       console.log(blockPressed.code, "userapi");
//       return axios
//         .post(`http://localhost:5000/api/studentCode`, { blockPressed })
//         .then((res) => res.data)
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   };
// };
