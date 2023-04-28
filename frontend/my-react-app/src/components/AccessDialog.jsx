import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Typography from "@mui/material/Typography";
import AccessDialogTitle from "./AccessDialogTitle";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
const AccessDialog = ({ document }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button
        onClick={handleClickOpen}
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
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
        {/* add document title here */}
        <AccessDialogTitle onClose={handleClose}>Share</AccessDialogTitle>
        <DialogContent
          xs={{ display: "flex", flexDirection: "column" }}
          gap={2}
          dividers={true}
        >
          <TextField
            sx={{ border: "none" }}
            fullWidth
            variant="outlined"
            label="Add people"
          />
          <Typography variant="h6" component="h5">
            People with access
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* the avatars */}
          </Box>
          <Typography variant="h6" component="h5">
            General access
          </Typography>
          <Box display="flex" gap={2}>
            {/* general access */}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              startIcon={<InsertLinkIcon />}
            >
              Copy Link
            </Button>
            <DialogActions>
              <Button variant="contained" autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AccessDialog;
