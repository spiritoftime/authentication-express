import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";

import Dialog from "@mui/material/Dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import AccessDialogTitle from "./AccessDialogTitle";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import { getUsersWithoutAccess, getUsersWithAccess } from "../services/user";
import {
  addUsersToDocument,
  editDocumentAccess,
} from "../services/userDocumentAccess";
import {
  addUsersToFolder,
  editFolderAccess,
} from "../services/userFolderAccess";
import AutoComplete from "./AutoComplete";
import PeopleToAdd from "./PeopleToAdd";
import PeopleWithAccess from "./PeopleWithAccess";
import AccessSnackBar from "./AccessSnackBar";
import { useAppContext } from "../context/appContext";
import GeneralAccess from "./GeneralAccess";

const AccessDialog = ({ documentId, residingFolder, accessType }) => {
  const [open, setOpen] = useState(false);
  const { myTrees, sharedTrees } = useAppContext();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [addUsers, setAddUsers] = useState([]);
  const [changeAccess, setChangeAccess] = useState({});

  const {
    mutate: addUsersDocumentMutation,
    error: userAccessError,
    isError: isUserAccessError,
  } = useMutation({
    mutationFn: ({ people, documentId }) => {
      return addUsersToDocument({ people, documentId });
    },
    onSuccess: (res) => {
      setMessage(res.data);
      setOpenSnackBar(true);
    },
  });

  const {
    mutate: addUsersFolderMutation,
    error: userFolderError,
    isError: isUserFolderError,
  } = useMutation({
    mutationFn: ({ people, folderId }) => {
      return addUsersToFolder({ people, folderId });
    },
    onSuccess: (res) => {
      setMessage(res.data);
    },
  });
  const { mutate: editDocumentAccessMutation } = useMutation({
    mutationFn: ({ changeAccess, documentId }) => {
      return editDocumentAccess({ changeAccess, documentId });
    },
    onSuccess: (res) => {
      setMessage(res.data);
    },
  });
  const { mutate: editFolderAccessMutation } = useMutation({
    mutationFn: ({ changeAccess, folderId }) => {
      return editFolderAccess({ changeAccess, folderId });
    },
    onSuccess: (res) => {
      setMessage(res.data);
    },
  });
  const { data: usersWithoutAccess, isLoading: isWithoutFetching } = useQuery({
    queryKey: ["users", "withoutAccess", residingFolder], // it will refetch whenever user opens the dialog
    queryFn: () => {
      return getUsersWithoutAccess(residingFolder);
    },
    enabled: residingFolder !== null, // only start fetching when residingFolder has been fetched from textEditor to prevent warning
    refetchOnWindowFocus: false,
    staleTime: 1,
  });

  const { data: userAccess, isLoading: isAccessFetching } = useQuery({
    queryKey: ["users", "withAccess", residingFolder],
    queryFn: () => {
      return getUsersWithAccess(residingFolder);
    },
    enabled: residingFolder !== null,
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
    staleTime: 1,
  });
  const queryClient = useQueryClient();
  const handleClickOpen = () => {
    queryClient.invalidateQueries({
      queryKey: ["users", "withoutAccess", residingFolder],
    });
    queryClient.invalidateQueries({
      queryKey: ["users", "withAccess", residingFolder],
    });
    setOpen(true);
  };
  const handleClose = () => {
    queryClient.invalidateQueries({
      queryKey: ["users", "withoutAccess", residingFolder],
    });
    queryClient.invalidateQueries({
      queryKey: ["users", "withAccess", residingFolder],
    });
    setOpen(false);
  };
  const saveChanges = () => {
    if (addUsers.length === 0 && Object.keys(changeAccess).length === 0) return;

    const folderNode =
      myTrees.tree[residingFolder] || sharedTrees.tree[residingFolder]; //locate node in its tree

    const dfs = (node, processDocument, processFolder) => {
      if (node.type === "document") {
        processDocument(node);
        return;
      }
      processFolder(node);
      if (node.children.length > 0)
        node.children.forEach((child) =>
          dfs(child, processDocument, processFolder)
        );
    };
    if (addUsers.length > 0)
      dfs(
        folderNode,
        (node) =>
          addUsersDocumentMutation({ people: addUsers, documentId: node.id }),
        (node) =>
          addUsersFolderMutation({ people: addUsers, folderId: node.id })
      );
    if (Object.keys(changeAccess).length > 0) {
      dfs(
        folderNode,
        (node) =>
          editDocumentAccessMutation({ documentId: node.id, changeAccess }),
        (node) => editFolderAccessMutation({ folderId: node.id, changeAccess })
      );
    }
    setAddUsers([]);
    setChangeAccess({});
    setOpen(false);
    setOpenSnackBar(true);
  };
  return (
    <Box>
      <AccessSnackBar
        setOpenSnackBar={setOpenSnackBar}
        openSnackBar={openSnackBar}
        message={message}
      />
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
        <AccessDialogTitle onClose={handleClose}>
          <Typography>Grant access to current folder</Typography>
        </AccessDialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          dividers={true}
        >
          {isAccessFetching || isWithoutFetching ? (
            <Typography>Loading...</Typography>
          ) : (
            accessType !== "viewer" && (
              <AutoComplete
                setAddUsers={setAddUsers}
                usersWithoutAccess={
                  usersWithoutAccess && usersWithoutAccess.data
                }
              />
            )
          )}
          {addUsers.length > 0 && (
            <PeopleToAdd setAddUsers={setAddUsers} addUsers={addUsers} />
          )}
          <PeopleWithAccess
            setChangeAccess={setChangeAccess}
            isAccessFetching={isAccessFetching}
            userAccess={userAccess && userAccess.data}
          />
          <GeneralAccess />
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              startIcon={<InsertLinkIcon />}
            >
              Copy Link
            </Button>
            <DialogActions>
              {accessType !== "viewer" && (
                <Button variant="contained" autoFocus onClick={saveChanges}>
                  Save changes
                </Button>
              )}
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AccessDialog;
