import React from "react";
import Box from "@mui/material/Box";
import { useMutation } from "@tanstack/react-query";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDocument } from "../services/document";

import IconButton from "@mui/material/IconButton";

import useReLoginMutation from "../../reactQueryMutations/useReLoginMutation";
const Document = ({
  node,
  depth,
  isPreview,
  switchRoom,
  socket,
  accessType,
}) => {
  if (isPreview)
    return (
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
    );
  const reloginMutation = useReLoginMutation();

  const { mutate: deleteDocumentMutation } = useMutation({
    mutationFn: (documentId) => {
      return deleteDocument(documentId);
    },
    onSuccess: (res) => {
      reloginMutation();
    },
  });
  return (
    <Box
      onClick={() => switchRoom(node.id, socket)}
      paddingLeft={`${depth * 16}px`}
      display="flex"
      alignItems="center"
    >
      <KeyboardArrowRightIcon />
      <Typography
        sx={{ cursor: "pointer" }}
        display="flex"
        alignItems="center"
        gap={1}
        variant="h6"
        component="span"
      >
        <ArticleIcon color="primary" />
        {node.text}
      </Typography>
      {accessType !== "viewer" && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // prevent switchRoom from firing
            deleteDocumentMutation(node.id);
          }}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Document;
