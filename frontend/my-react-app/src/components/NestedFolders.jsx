import React from "react";
import Folder from "./Folder";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import Document from "./Document";
import { useAppContext } from "../context/appContext";
import { useMutation } from "@tanstack/react-query";
import { editDocument } from "../services/document";
import { editFolder } from "../services/folder";
import { api } from "../services/makeRequest";
import { persistLogin } from "../services/auth";

const NestedFolders = ({ switchRoom, socket }) => {
  const { tree: treeData, setAuthDetails, setIsLoadingAuth } = useAppContext();
  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: () => {
      setIsLoadingAuth(true);
      return persistLogin();
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });
      const accessToken = res.headers.authorization.split(" ")[1];

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
      persistLoginMutation(); // rerun login to get the updated tree
    },
  });
  const handleDrop = (newTree, { dragSource, dropTarget }) => {
    if (!dropTarget || !dragSource) return;
    editMutation({ dragSource, dropTarget });
  };
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={"root"}
        render={(node, { depth, isOpen, onToggle }) => {
          if (node.type === "document")
            return (
              <Document
                switchRoom={switchRoom}
                socket={socket}
                node={node}
                depth={depth}
              />
            );
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
  );
};

export default NestedFolders;
