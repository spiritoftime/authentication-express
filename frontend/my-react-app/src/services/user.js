import { makeRequest } from "./makeRequest";
export function getUsersWithoutAccess(documentId, folderId) {
  return makeRequest(`/users/withoutAccess/`, {
    params: {
      documentId: documentId,
      folderId: folderId,
    },
  });
}
export function getUsersWithAccess(documentId, folderId) {
  return makeRequest(`/users/withAccess/`, {
    params: {
      documentId: documentId,
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
