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
export function addUserToDocument({ documentId, name }) {
  return makeRequest(`/users/addUserToDocument`, {
    method: "POST",
    data: { documentId, name },
  });
}
