import { makeRequest } from "./makeRequest";
export function editDocument({ documentId, title }) {
  return makeRequest(`/documents/${documentId}`, {
    method: "POST",
    data: { title },
  });
}
