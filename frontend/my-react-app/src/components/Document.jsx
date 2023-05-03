import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ArticleIcon from "@mui/icons-material/Article";
const Document = ({ node }) => {
  return (
    <Box display="flex" alignItems="center" paddingLeft={2}>
      <ArticleIcon />
      {node.title}
      <Button startIcon={<CreateNewFolderIcon />}>Add Folder</Button>
      <Button startIcon={<InsertDriveFileIcon />}>Add File</Button>
    </Box>
  );
};

export default Document;
