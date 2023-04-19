import { makeRequest } from "./makeRequest";
export function getPost() {
  return makeRequest("/posts");
}
