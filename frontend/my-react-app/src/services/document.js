import { makeRequest } from "./makeRequest";
export function editDocument(data) {
  return makeRequest(`/documents/${data.documentId}`, {
    method: "PATCH",
    data: data,
  });
}
export function createDocument({ folderId, title, createdBy, parent }) {
  return makeRequest(`/documents/`, {
    method: "POST",
    data: { folderId, title, createdBy },
  });
}
export function deleteDocument(documentId) {
  return makeRequest(`/documents/${documentId}`, {
    method: "DELETE",
  });
}
