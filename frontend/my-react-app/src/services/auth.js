import { makeRequest } from "./makeRequest";

export function register({ username, password }) {
  return makeRequest("/register", {
    method: "POST",
    data: { username, password },
  });
}
export function login({ username, password }) {
  return makeRequest("/login", {
    method: "POST",
    data: { username, password },
  });
}

