import { useContext, useMemo, useState } from "react";
import React from "react";
const AppContext = React.createContext();

const sharedWithRoot = {
  id: null,
  createdBy: 1,
  parent: "root",
  text: "Shared With me",
  droppable: true,
  type: "folder",
  children: [],
};
const personalRoot = {
  id: null,
  createdBy: 1,
  parent: "root",
  text: "Personal Drive",
  droppable: true,
  type: "folder",
  children: [],
};
const AppProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    accessibleDocuments,
    accessibleFolders,
    createdDocuments,
    createdFolders,
  } = authDetails;
  function createTreeData(root, documents, folders) {
    // create the array for nestedFolder
    (documents || []).forEach((document) => {
      document.droppable = false;
      document.type = "document";
    });
    (folders || []).forEach((folder) => {
      folder.droppable = true;
      folder.type = "folder";
    });
    function createTree(root, documents, folders) {
      const tree = { null: root }; // the key will be 'null'
      // traverse through all folders and add them to the tree first
      (folders || []).forEach((folder) => {
        folder.children = [];
        tree[folder.id] = folder;
      });

      (folders || []).forEach((folder) => {
        const parent = tree[folder.parent] || tree["null"]; // Add to root if parent is not found
        if (parent) parent.children.push(folder);
      });

      (documents || []).forEach((document) => {
        const parent = tree[document.parent];
        if (parent) {
          parent.children.push(document);
        }
      });
      return tree;
    }
    const tree = createTree(root, documents, folders);
    return {
      tree: tree,
      reactTree: [root, ...(documents || []), ...(folders || [])],
    };
  }

  const myTrees = useMemo(() => {
    return createTreeData(personalRoot, createdDocuments, createdFolders);
  }, [createdDocuments, createdFolders]);
  const sharedTrees = useMemo(() => {
    return createTreeData(
      sharedWithRoot,
      accessibleDocuments,
      accessibleFolders
    );
  }, [accessibleDocuments, accessibleFolders]);

  return (
    <AppContext.Provider
      value={{
        authDetails,
        myTrees,
        sharedTrees,
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
