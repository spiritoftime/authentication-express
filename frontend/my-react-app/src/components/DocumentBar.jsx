import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import CommentIcon from "@mui/icons-material/Comment";
const DocumentBar = ({ documentSaved }) => {
  return (
    <Box justifyContent="space-between" display="flex" alignItems="center">
      <Box gap={2} display="flex" alignItems="center">
        <TextField
          sx={{ border: "none" }}
          variant="outlined"
          label="Document Title"
        />

        <Typography variant="h6" component="h5">
          {documentSaved}
        </Typography>
      </Box>
      <Box gap={2} display="flex" alignItems="center">
        <CommentIcon />
        <Button
          variant="contained"
          sx={{
            alignItems: "center",
            backgroundColor: "#a5d8ff",
            color: "#001d35",
            borderRadius: "30px",
          }}
          startIcon={<HttpsIcon fontSize="small" />}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentBar;
