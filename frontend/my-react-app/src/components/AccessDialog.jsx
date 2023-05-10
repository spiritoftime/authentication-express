import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";

import Dialog from "@mui/material/Dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Typography from "@mui/material/Typography";
import AccessDialogTitle from "./AccessDialogTitle";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import {
  getUsersWithoutAccess,
  getUsersWithAccess,
  addUsersToDocument,
  addUsersToFolder,
} from "../services/user";
import AutoComplete from "./AutoComplete";
import PeopleToAdd from "./PeopleToAdd";
import PeopleWithAccess from "./PeopleWithAccess";
import AccessSnackBar from "./AccessSnackBar";
import SelectOption from "./SelectOption";
import { useAppContext } from "../context/appContext";

const AccessDialog = ({ documentId, residingFolder }) => {
  const [open, setOpen] = useState(false);
  const { myTrees, sharedTrees } = useAppContext();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [addUsers, setAddUsers] = useState([]);
  const [option, setOption] = useState("document");
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
  console.log(residingFolder);
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
  const { data: usersWithoutAccess, isLoading: isUserFetching } = useQuery({
    queryKey: ["users", "withoutAccess", open, residingFolder], // it will refetch whenever user opens the dialog
    queryFn: () => getUsersWithoutAccess(residingFolder),
    refetchOnWindowFocus: false,
  });

  const { data: userAccess, isLoading: isAccessFetching } = useQuery({
    queryKey: ["users", "withAccess", "documentId", open, residingFolder],
    queryFn: () => getUsersWithAccess(residingFolder),
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
  });
  console.log(residingFolder);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const saveChanges = () => {
    if (addUsers.length == 0) return;
    if (option === "document")
      addUsersDocumentMutation({ people: addUsers, documentId });
    else {
      const folderNode =
        myTrees.tree[residingFolder] || sharedTrees.tree[residingFolder]; //locate node in its tree
      const dfs = (node) => {
        if (node.type === "document") {
          addUsersDocumentMutation({ people: addUsers, documentId: node.id });
          return;
        }

        addUsersFolderMutation({ people: addUsers, folderId: node.id });
        if (node.children.length > 0)
          node.children.forEach((child) => dfs(child));
      };
      dfs(folderNode);
    }
    setAddUsers([]);
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
          <Typography>Share</Typography>
        </AccessDialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          dividers={true}
        >
          <SelectOption
            setAddUsers={setAddUsers}
            residingFolder={residingFolder}
            option={option}
            setOption={setOption}
          />
          {isUserFetching ? (
            <Typography>Loading...</Typography>
          ) : (
            <AutoComplete
              setAddUsers={setAddUsers}
              usersWithoutAccess={usersWithoutAccess && usersWithoutAccess.data}
            />
          )}
          {addUsers.length > 0 && (
            <PeopleToAdd setAddUsers={setAddUsers} addUsers={addUsers} />
          )}
          <PeopleWithAccess
            isAccessFetching={isAccessFetching}
            option={option}
            userAccess={userAccess && userAccess.data}
          />
          <Typography variant="h6" component="h5">
            General access
          </Typography>
          <Box display="flex" gap={2}>
            {/* general access */}
          </Box>
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
              <Button variant="contained" autoFocus onClick={saveChanges}>
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
