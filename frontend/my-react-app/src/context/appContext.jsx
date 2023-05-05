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
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { accessibleDocuments: documents, accessibleFolders: folders } =
    authDetails;
  function createTreeData() {
    (documents || []).forEach((document) => {
      document.droppable = false;
      document.type = "document";
    });
    (folders || []).forEach((folder) => {
      folder.droppable = true;
      folder.type = "folder";
    });
    return [
      {
        id: null,
        createdBy: 1,
        parent: "root",
        text: "root",
        droppable: true,
        type: "folder",
      },
      ...(documents || []),
      ...(folders || []),
    ];
  }

  const tree = useMemo(() => {
    return createTreeData();
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
