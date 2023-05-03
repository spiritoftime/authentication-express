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

const Folder = ({ id }) => {
  const { tree } = useAppContext();
  const [expand, setExpand] = useState(false);
  const folderNode = tree[id];

  return (
    <Box paddingLeft={2}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          {expand ? (
            <ExpandMoreIcon onClick={() => setExpand(!expand)} />
          ) : (
            <KeyboardArrowRightIcon onClick={() => setExpand(!expand)} />
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
            <IconButton>
              <CreateNewFolderIcon />
            </IconButton>
            <IconButton>
              <PostAddIcon />
            </IconButton>
          </Box>
        </Box>
        {expand && (
          <Box
            sx={{
              padding: "10px 15px",
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
      </Box>
    </Box>
  );
};

export default Folder;
