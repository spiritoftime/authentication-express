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
