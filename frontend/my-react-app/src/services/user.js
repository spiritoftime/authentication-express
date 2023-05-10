import { makeRequest } from "./makeRequest";
export function getUsersWithoutAccess(folderId) {
  if (!folderId) return;
  return makeRequest(`/users/withoutAccess/`, {
    params: {
      folderId: folderId,
    },
  });
}
export function getUsersWithAccess(folderId) {
  if (!folderId) return;
  return makeRequest(`/users/withAccess/`, {
    params: {
      folderId: folderId,
    },
  });
}
export function addUsersToDocument({ documentId, people }) {
  return makeRequest(`/users/addUsersToDocument`, {
    method: "POST",
    data: { documentId, people },
  });
}
export function addUsersToFolder({ folderId, people }) {
  return makeRequest(`/users/addUsersToFolder`, {
    method: "POST",
    data: { folderId, people },
  });
}
