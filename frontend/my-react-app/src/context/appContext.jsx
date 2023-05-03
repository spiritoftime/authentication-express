import { useContext, useMemo, useState } from "react";
import React from "react";
const AppContext = React.createContext();
// const accessibleFolder = {
//   id: "488db8e7-59a5-4fda-9f63-dc48f5e1e2b3",
//   createdBy: 1,
//   parentFolderId: "857b7472-9122-43e2-bd74-ec4d1f9df25d",
//   folderName: "Custom Hooks",
// };
// const accessibleDocument =  {
//   "id": "81fcb940-400f-4dfe-9630-d9bfc98987f4",
//   "title": "Untitled Document",
//   "folderId": null
// },
const AppProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { accessibleDocuments: documents, accessibleFolders: folders } =
    authDetails;
  function createTree() {
    const root = {
      folderName: "root",
      children: [],
      type: "folder",
      id: "null",
    };

    const tree = { null: root }; // the key will be 'null'
    // traverse through all folders and add them to the tree first
    (folders || []).forEach((folder) => {
      folder.type = "folder";
      folder.children = [];
      tree[folder.id] = folder;
    });

    (folders || []).forEach((folder) => {
      const parent = tree[folder.parentFolderId] || tree["null"]; // Add to root if parent is not found
      if (parent) parent.children.push(folder);
    });

    (documents || []).forEach((document) => {
      document.type = "document";
      const parent = tree[document.folderId];
      if (parent) {
        parent.children.push(document);
      }
    });
    return tree;
  }
  const tree = useMemo(() => {
    return createTree();
  }, [documents, folders]);
  return (
    <AppContext.Provider
      value={{
        authDetails,
        tree,
        setAuthDetails,
        isLoadingAuth,
        setIsLoadingAuth,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
