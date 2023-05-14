import { makeRequest } from "./makeRequest";

export function register({ username, password, name }) {
  return makeRequest("/register", {
    method: "POST",
    data: { username, password, name },
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
