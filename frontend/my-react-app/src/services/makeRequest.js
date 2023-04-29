import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
});
export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => {
      const accessToken = localStorage.getItem("accessToken");
      if (!res.headers.authorization) return;
      const headerAccessToken = res.headers.authorization.split(" ")[1];
      if (accessToken !== headerAccessToken) {
        localStorage.setItem("accessToken", headerAccessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${headerAccessToken}`;
      }

      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
// the optional chaining is for a frontend error
//err.response.data.message is only errors from our server
