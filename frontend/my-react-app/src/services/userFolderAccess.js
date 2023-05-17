import { makeRequest } from "./makeRequest";
export function addUsersToFolder({ folderId, people }) {
  return makeRequest(`/folderAccess/addUsersToFolder`, {
    method: "POST",
    data: { folderId, people },
  });
}
export function editFolderAccess({ folderId, changeAccess }) {
  return makeRequest(`/folderAccess/editFolderAccess`, {
    method: "PATCH",
    data: { folderId, changeAccess },
  });
}
