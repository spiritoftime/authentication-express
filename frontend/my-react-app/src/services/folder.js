import { makeRequest } from "./makeRequest";
export function createFolder({ folderId, title, createdBy }) {
  return makeRequest(`/folders/`, {
    method: "POST",
    data: { folderId, title, createdBy },
  });
}
export function deleteFolder(folderId) {
  return makeRequest(`/folders/${folderId}`, {
    method: "DELETE",
  });
}
