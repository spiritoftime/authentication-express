import React, { useRef } from "react";
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

import useReLoginMutation from "../../reactQueryMutations/useReLoginMutation";
const NestedFolders = ({ switchRoom, socket, type }) => {
  const treeRef = useRef(null);
  const handleOpen = (nodeId) => treeRef.current.open(nodeId);
  const { myTrees, sharedTrees, setAuthDetails, setIsLoadingAuth } =
    useAppContext();
  const reloginMutation = useReLoginMutation();
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
      reloginMutation(); // rerun login to get the updated tree
    },
  });
  const handleDrop = (newTree, { dragSource, dropTarget }) => {
    if (!dropTarget || !dragSource) return;
    editMutation({ dragSource, dropTarget });
  };
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        ref={treeRef}
        tree={type === "personal" ? myTrees.reactTree : sharedTrees.reactTree}
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
                handleOpen={handleOpen}
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
