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
