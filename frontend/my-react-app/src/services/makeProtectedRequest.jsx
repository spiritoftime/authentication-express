import axios from "axios";
export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
export function makeProtectedRequest(url, options) {
  return api(url, options)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
