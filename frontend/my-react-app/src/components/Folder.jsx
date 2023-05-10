import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Box from "@mui/material/Box";
import { useMutation } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Grid from "@mui/material/Grid";
import { createFolder, deleteFolder } from "../services/folder";
import { createDocument } from "../services/document";
import DeleteIcon from "@mui/icons-material/Delete";
import useReLoginMutation from "../../reactQueryMutations/useReLoginMutation";

const Folder = ({ node, depth, isOpen, onToggle, isPreview, handleOpen }) => {
  if (isPreview)
    return (
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        paddingLeft={`${depth * 16}px`}
      >
        {isOpen ? (
          <ExpandMoreIcon
            sx={{ cursor: "pointer" }}
            onClick={() => onToggle(node.id)}
          />
        ) : (
          <KeyboardArrowRightIcon
            sx={{ cursor: "pointer" }}
            onClick={() => onToggle(node.id)}
          />
        )}
        <Typography
          display="flex"
          alignItems="center"
          variant="h6"
          gap={1}
          component="h6"
        >
          <FolderIcon color="warning" />
          {node.text}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton
            color="info"
            onClick={() => setShowInput({ visible: true, isFolder: true })}
          >
            <CreateNewFolderIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => setShowInput({ visible: true, isFolder: false })}
          >
            <PostAddIcon />
          </IconButton>
          <IconButton onClick={() => deleteFolderMutation(id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
    );
  const { tree, isDarkMode, authDetails, setAuthDetails, setIsLoadingAuth } =
    useAppContext();
  const reloginMutation = useReLoginMutation();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [newNodeName, setNewNodeName] = useState("");
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const { mutate: deleteFolderMutation } = useMutation({
    mutationFn: (folderId) => {
      return deleteFolder(folderId);
    },
    onSuccess: (res) => {
      reloginMutation();
    },
  });
  const {
    mutate: addFolderNodeMutation,
    error: addFolderNodeError,
    isError: IsaddFolderNodeError,
  } = useMutation({
    mutationFn: ({ title, folderId, createdBy, isFolder }) => {
      if (isFolder) return createFolder({ title, folderId, createdBy });
      return createDocument({ title, folderId, createdBy });
    },
    onSuccess: (res) => {
      reloginMutation(); // rerun login to get the updated tree
      setShowInput({ visible: false, isFolder: null });
      setNewNodeName("");
    },
  });

  const onAddFolderNode = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      addFolderNodeMutation({
        title: e.target.value,
        folderId: node.id,
        createdBy: authDetails.id,

        isFolder: showInput.isFolder,
      });
    }
  };
  return (
    <Grid>
      {
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          paddingLeft={`${depth * 16}px`}
        >
          {isOpen ? (
            <ExpandMoreIcon
              sx={{ cursor: "pointer" }}
              onClick={() => onToggle(node.id)}
            />
          ) : (
            <KeyboardArrowRightIcon
              sx={{ cursor: "pointer" }}
              onClick={() => onToggle(node.id)}
            />
          )}
          <Typography
            sx={{ cursor: "pointer" }}
            display="flex"
            alignItems="center"
            variant="h6"
            gap={1}
            component="h6"
          >
            <FolderIcon color="warning" />
            {node.text}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              color="info"
              onClick={() => {
                setShowInput({ visible: true, isFolder: true });
                handleOpen(node.id);
              }}
            >
              <CreateNewFolderIcon />
            </IconButton>
            <IconButton
              color="success"
              onClick={() => {
                setShowInput({ visible: true, isFolder: false });
                handleOpen(node.id);
              }}
            >
              <PostAddIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                deleteFolderMutation(node.id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      }
      {showInput.visible && (
        <Grid item xs={12}>
          <input
            onChange={(e) => setNewNodeName(e.target.value)}
            style={{
              color: isDarkMode ? "white" : "#1f2b44",
              backgroundColor: isDarkMode ? "#fff" : "",
              background: "none",
              border: `1px solid ${isDarkMode ? "#d6b8b7" : "#1f2b44"}`,
            }}
            autoFocus
            onKeyDown={onAddFolderNode}
            onBlur={() => {
              setShowInput({ visible: false, isFolder: null });
              setNewNodeName("");
            }}
            className="node-input"
            placeholder={
              showInput.isFolder ? "Untitled Folder" : "Untitled Document"
            }
            value={newNodeName}
          ></input>
        </Grid>
      )}
    </Grid>
  );
};

export default Folder;
