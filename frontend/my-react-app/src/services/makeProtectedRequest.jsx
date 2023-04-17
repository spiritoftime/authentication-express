import axios from "axios";
export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
export function makeProtectedRequest(url, options) {
  return api(url, options)
    .then((res) => {
      // i will need to update the localStorage everytime when accesstoken is not the same as the one in localStorage
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
  // on the various mutations and queries, onError i will need to navigate to login or register and display something
}
