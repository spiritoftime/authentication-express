import { makeRequest } from "./makeRequest";
export function addUsersToDocument({ documentId, people }) {
  return makeRequest(`/documentAccess/addUsersToDocument`, {
    method: "POST",
    data: { documentId, people },
  });
}
export function editDocumentAccess({ documentId, changeAccess }) {
  return makeRequest(`/documentAccess/editDocumentAccess`, {
    method: "PATCH",
    data: { documentId, changeAccess },
  });
}
