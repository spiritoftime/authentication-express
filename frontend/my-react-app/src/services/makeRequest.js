import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export function makeRequest(url, options) {
  return axiosInstance(url, options)
    .then((res) => {
      if (!res.headers.authorization) return;

      const headerAccessToken = res.headers.authorization.split(" ")[1];

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${headerAccessToken}`;

      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
// the optional chaining is for a frontend error
//err.response.data.message is only errors from our server
