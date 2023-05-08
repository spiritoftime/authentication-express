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

export function logout(userId) {
  return makeRequest("/logout", {
    method: "POST",
    data: { userId },
  });
}
export function persistLogin(accessToken) {
  return makeRequest("/persist", {
    method: "GET",
  });
}
