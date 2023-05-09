import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
const AccessDialogTitle = ({ children, onClose }) => {
  return (
    <DialogTitle
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default AccessDialogTitle;
