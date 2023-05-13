import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { editDocument } from "../services/document";
import { useMutation } from "@tanstack/react-query";
import CommentIcon from "@mui/icons-material/Comment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import HistoryIcon from "@mui/icons-material/History";
import AccessDialog from "./AccessDialog";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import ActiveUsers from "./ActiveUsers";
const DocumentBar = ({
  documentSaved,
  accessType,
  documentId,
  setDocumentSaved,
  users,
  documentTitle,
  residingFolder,
  setDocumentTitle,
}) => {
  const {
    mutate: editDocumentMutation,
    error: editDocumentError,
    isError: isEditDocumentError,
  } = useMutation({
    mutationFn: (data) => {
      return editDocument(data);
    },
    onSuccess: (res) => {
      setDocumentSaved(res.data);
    },
  });
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDocumentSaved("saving document....");
      editDocumentMutation({ documentId: documentId, title: documentTitle }); // usemutation only accepts one obj as args
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [documentTitle]);
  return (
    <Grid
      container
      padding={"16px 0"}
      rowGap={2}
      justifyContent="space-between"
    >
      <Grid item xs={12} sm={4}>
        <TextField
          sx={{ border: "none", width: "100%" }}
          variant="outlined"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box
          gap={2}
          justifyContent="space-between"
          display="flex"
          alignItems="center"
        >
          <Box display="flex" gap={2} alignItems="center">
            {documentSaved === "All changes saved!" ? (
              <CloudDoneIcon color="success" />
            ) : (
              <RestartAltIcon />
            )}
            <Typography
              sx={{ whiteSpace: "nowrap" }}
              variant="body1"
              component="p"
            >
              {documentSaved}
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <ActiveUsers users={users} />
            {/* <HistoryIcon />
        <CommentIcon /> */}
            <AccessDialog
              accessType={accessType}
              residingFolder={residingFolder}
              documentId={documentId}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocumentBar;
