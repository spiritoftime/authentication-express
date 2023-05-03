import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const Document = ({ node }) => {
  return (
    <Box display="flex" alignItems="center" paddingLeft={2}>
      <KeyboardArrowRightIcon />
      <ArticleIcon />
      {node.title}
      <IconButton>
        <CreateNewFolderIcon />
      </IconButton>
      <IconButton>
        <PostAddIcon />
      </IconButton>
    </Box>
  );
};

export default Document;
