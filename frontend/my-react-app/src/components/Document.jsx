import React from "react";
import Box from "@mui/material/Box";
import { useMutation } from "@tanstack/react-query";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDocument } from "../services/document";
import { useAppContext } from "../context/appContext";
import IconButton from "@mui/material/IconButton";
import { persistLogin } from "../services/auth";
import { api } from "../services/makeRequest";
const Document = ({ node }) => {
  const { setAuthDetails, setIsLoadingAuth } = useAppContext();
  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: (accessToken) => {
      setIsLoadingAuth(true);
      return persistLogin(accessToken);
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });
      const accessToken = res.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoadingAuth(false); // Set loading state to false after checking
    },
  });
  const { mutate: deleteDocumentMutation } = useMutation({
    mutationFn: (documentId) => {
      return deleteDocument(documentId);
    },
    onSuccess: (res) => {
      persistLoginMutation(localStorage.getItem("accessToken"));
    },
  });
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
          <ArticleIcon color="primary" />
          {node.text}
        </Typography>
        <IconButton
          onClick={() => deleteDocumentMutation(node.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Document;
