import React from "react";
import Box from "@mui/material/Box";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";

const Document = ({ node }) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <KeyboardArrowRightIcon />
        <Typography
          display="flex"
          alignItems="center"
          gap={1}
          variant="h6"
          component="span"
        >
          <ArticleIcon />
          {node.title}
        </Typography>
      </Box>
    </>
  );
};

export default Document;
