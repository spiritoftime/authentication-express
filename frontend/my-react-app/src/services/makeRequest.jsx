import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
// the optional chaining is for a frontend error
//err.response.data.message is only errors from our server
