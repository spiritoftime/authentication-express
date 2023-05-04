import { makeRequest } from "./makeRequest";
export function editDocument({ documentId, title }) {
  return makeRequest(`/documents/${documentId}`, {
    method: "POST",
    data: { title },
  });
}
export function createDocument({ folderId, title, createdBy }) {
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
