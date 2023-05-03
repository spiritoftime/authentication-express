import React from "react";
import { useAppContext } from "../context/appContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import Document from "./Document";
const Folder = ({ id }) => {
  const { tree } = useAppContext();

  const folderNode = tree[id];

  return (
    <Box paddingLeft={2} display="flex" flexDirection="column">
      <Box display="flex" gap={2} alignItems="center">
        <Typography
          display="flex"
          alignItems="center"
          variant="h6"
          component="h6"
        >
          <FolderIcon />
          {folderNode.folderName}
        </Typography>
        <Button startIcon={<CreateNewFolderIcon />}>Add Folder</Button>
        <Button startIcon={<InsertDriveFileIcon />}>Add File</Button>
      </Box>
      {folderNode.children &&
        folderNode.children.map((fol) => {
          if (fol.type === "folder") return <Folder key={fol.id} id={fol.id} />;
          else return <Document key={fol.id} node={fol} />;
        })}
    </Box>
  );
};

export default Folder;
