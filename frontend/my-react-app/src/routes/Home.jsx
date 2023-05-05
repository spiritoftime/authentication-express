import React from "react";
import Box from "@mui/material/Box";
import Folder from "../components/Folder";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import Document from "../components/Document";
import { useAppContext } from "../context/appContext";
import { useMutation } from "@tanstack/react-query";
import { editDocument } from "../services/document";
import { editFolder } from "../services/folder";
import { api } from "../services/makeRequest";
import { persistLogin } from "../services/auth";
const Home = () => {
  const { tree: treeData, setAuthDetails, setIsLoadingAuth } = useAppContext();
  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: (accessToken) => {
      setIsLoadingAuth(true);
      return persistLogin(accessToken);
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });
      const accessToken = res.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoadingAuth(false); // Set loading state to false after checking
    },
  });
  const {
    mutate: editMutation,
    error: editError,
    isError: isEditError,
  } = useMutation({
    mutationFn: ({ dragSource, dropTarget }) => {
      const { id: NodeToChange } = dragSource;
      const { id: newParent } = dropTarget;
      console.log(NodeToChange, newParent);
      if (dragSource.type === "document")
        return editDocument({
          parent: newParent === null ? "root" : newParent,
          documentId: NodeToChange,
        });

      return editFolder({
        parent: newParent === null ? "root" : newParent,
        folderId: NodeToChange,
      });
    },
    onSuccess: (res) => {
      persistLoginMutation(localStorage.getItem("accessToken")); // rerun login to get the updated tree
    },
  });
  const handleDrop = (newTree, { dragSource, dropTarget }) => {
    if (!dropTarget || !dragSource) return;
    editMutation({ dragSource, dropTarget });
  };
  return (
    <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={"root"}
          render={(node, { depth, isOpen, onToggle }) => {
            if (node.type === "document")
              return <Document node={node} depth={depth} />;
            else
              return (
                <Folder
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={onToggle}
                />
              );
          }}
          dragPreviewRender={(monitorProps) => {
            if (monitorProps.item.type === "document")
              return <Document node={monitorProps.item} isPreview={true} />;
            return <Folder node={monitorProps.item} isPreview={true} />;
          }}
          onDrop={handleDrop}
        />
      </DndProvider>
    </Box>
  );
};

export default Home;
