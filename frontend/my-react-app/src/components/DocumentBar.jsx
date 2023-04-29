import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import CommentIcon from "@mui/icons-material/Comment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import HistoryIcon from "@mui/icons-material/History";
import AccessDialog from "./AccessDialog";
const DocumentBar = ({ documentSaved, documentId }) => {
  return (
    <Box justifyContent="space-between" display="flex" alignItems="center">
      <Box gap={2} display="flex" alignItems="center">
        <TextField
          sx={{ border: "none" }}
          variant="outlined"
          label="Document Title"
        />

        <Box display="flex" gap={2} alignItems="center">
          {documentSaved === "All changes saved!" ? (
            <CloudDoneIcon />
          ) : (
            <RestartAltIcon />
          )}
          <Typography variant="h6" component="h5">
            {documentSaved}
          </Typography>
        </Box>
      </Box>
      <Box gap={2} display="flex" alignItems="center">
        <HistoryIcon />
        <CommentIcon />
        <AccessDialog documentId={documentId} />
      </Box>
    </Box>
  );
};

export default DocumentBar;
