import { makeRequest } from "./makeRequest";
export function getUsers() {
  return makeRequest("/users/all");
}
export function getUsersWithAccess(documentId) {
  return makeRequest(`/users/withAccess/${documentId}`);
}
