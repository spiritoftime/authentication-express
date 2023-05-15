import { makeRequest } from "./makeRequest";
export function editDocument(data) {
  return makeRequest(`/documents/${data.documentId}`, {
    method: "PATCH",
    data: data,
  });
}
export function createDocument({
  folderId,
  title,
  createdBy,
  parent,
  accessType,
}) {
  return makeRequest(`/documents/`, {
    method: "POST",
    data: { folderId, title, createdBy, accessType },
  });
}
export function deleteDocument(documentId) {
  return makeRequest(`/documents/${documentId}`, {
    method: "DELETE",
  });
}
