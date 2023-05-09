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
  addUserToDocument,
} from "../services/user";
import AutoComplete from "./AutoComplete";
import PeopleToAdd from "./PeopleToAdd";
import PeopleWithAccess from "./PeopleWithAccess";
import AccessSnackBar from "./AccessSnackBar";
import SelectOption from "./SelectOption";

const AccessDialog = ({ documentId, residingFolder }) => {
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [addUsers, setAddUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("document");
  const {
    mutate: addUserAccessMutation,
    error: userAccessError,
    isError: isUserAccessError,
  } = useMutation({
    mutationFn: ({ name, documentId }) => {
      return addUserToDocument({ name, documentId });
    },
    onSuccess: (res) => {
      setMessage(res.data);
      setOpenSnackBar(true);
    },
  });
  const { data: usersWithoutAccess, isLoading: isUserFetching } = useQuery({
    queryKey: ["users", "withoutAccess", "documentId", open], // it will refetch whenever user opens the dialog
    queryFn: () => getUsersWithoutAccess(documentId, residingFolder),
    refetchOnWindowFocus: false,
  });

  const { data: userAccess, isLoading: isAccessFetching } = useQuery({
    queryKey: ["users", "withAccess", "documentId", open],
    queryFn: () => getUsersWithAccess(documentId, residingFolder),
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const saveChanges = () => {
    for (const name of addUsers) {
      addUserAccessMutation({ name: name, documentId });
    }
    setAddUsers([]);
    setOpen(false);
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
            residingFolder={residingFolder}
            option={option}
            setOption={setOption}
          />
          {isUserFetching ? (
            <Typography>Loading...</Typography>
          ) : (
            <AutoComplete
              setAddUsers={setAddUsers}
              usersWithoutAccess={usersWithoutAccess}
            />
          )}
          {addUsers.length > 0 && <PeopleToAdd addUsers={addUsers} />}
          <PeopleWithAccess
            isAccessFetching={isAccessFetching}
            userAccess={userAccess}
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
