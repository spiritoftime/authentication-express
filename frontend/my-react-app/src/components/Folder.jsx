import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Document from "./Document";
import Grid from "@mui/material/Grid";

const Folder = ({ id }) => {
  const { tree, isDarkMode } = useAppContext();
  const [newNodeName, setNewNodeName] = useState("");
  const [expand, setExpand] = useState(true);
  const folderNode = tree[id];
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const onAddFolderNode = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      if (showInput.isFolder)
        // run add folder logic
        // else // run add document logic
        setShowInput({ visible: false, isFolder: null });
      setNewNodeName("");
    }
  };
  return (
    <>
      <Grid container>
        {id !== "null" && (
          <Grid item xs={12} display="flex" alignItems="center">
            {expand ? (
              <ExpandMoreIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setExpand(!expand)}
              />
            ) : (
              <KeyboardArrowRightIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setExpand(!expand)}
              />
            )}
            <Typography
              display="flex"
              alignItems="center"
              variant="h6"
              gap={1}
              component="h6"
            >
              <FolderIcon />
              {folderNode.folderName}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() => setShowInput({ visible: true, isFolder: true })}
              >
                <CreateNewFolderIcon />
              </IconButton>
              <IconButton
                onClick={() => setShowInput({ visible: true, isFolder: false })}
              >
                <PostAddIcon />
              </IconButton>
            </Box>
          </Grid>
        )}
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
              onKeyDown={onAddFolder}
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
        {expand && (
          <Box
            sx={{
              padding: "0px 15px",
            }}
            display="flex"
            flexDirection="column"
          >
            {folderNode.children &&
              folderNode.children.map((fol) => {
                if (fol.type === "folder")
                  return <Folder key={fol.id} id={fol.id} />;
                else return <Document key={fol.id} node={fol} />;
              })}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Folder;
