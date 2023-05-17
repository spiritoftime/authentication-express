import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getDateDiff from "../helper_functions/convertTimeStamp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { useTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../helper_functions/muiAvatar";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { createFolder } from "../services/folder";
import useReLoginMutation from "../../reactQueryMutations/useReLoginMutation";
import { useMutation } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import { createDocument } from "../services/document";
import TablePagination from "@mui/material/TablePagination";

const FolderTable = ({ data, tableType, header }) => {
  const { authDetails, isDarkMode, setIsLoadingAuth } = useAppContext();
  const [showInput, setShowInput] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [title, setTitle] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const reloginMutation = useReLoginMutation();
  const {
    mutate: createDocumentMutation,
    error: createDocError,
    isError: IscreateDocError,
  } = useMutation({
    mutationFn: (folderId) => {
      return createDocument({
        title: "Untitled Document",
        folderId,
        createdBy: authDetails.id,
        accessType: "creator",
      });
      // create the document
    },
    onSuccess: async (res) => {
      setIsLoadingAuth(true);
      reloginMutation();
      navigate(`/documents/${res.data.document.id}`);
    },
  });
  const {
    mutate: createFolderMutation,
    error: createError,
    isError: IscreateError,
  } = useMutation({
    mutationFn: (title) => {
      return createFolder({
        title,
        folderId: null,
        createdBy: authDetails.id,
        accessType: "creator",
      });
      // create the document
    },
    onSuccess: (res) => {
      const folderId = res.data.folder.id;
      createDocumentMutation(folderId);
    },
  });
  const createNewFolder = (e) => {
    if (e.keyCode === 13 && title) {
      createFolderMutation(title);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          style={{
            color: theme.palette.landingPage.accent,

            fontWeight: 600,
          }}
          variant="h4"
        >
          {header}
        </Typography>
        {tableType === "created" && !showInput && (
          <IconButton
            color="info"
            onClick={() => {
              setShowInput(true);
            }}
          >
            <CreateNewFolderIcon />
          </IconButton>
        )}
        {showInput && (
          <input
            onChange={(e) => setTitle(e.target.value)}
            style={{
              color: isDarkMode ? "white" : "#1f2b44",
              backgroundColor: isDarkMode ? "#fff" : "",
              background: "none",
              border: `1px solid ${isDarkMode ? "#d6b8b7" : "#1f2b44"}`,
            }}
            autoFocus
            onKeyDown={createNewFolder}
            onBlur={() => {
              setShowInput(false);
              setTitle("");
            }}
            className="node-input"
            placeholder={"Untitled Folder"}
            value={title}
          ></input>
        )}
      </Box>
      <TableContainer>
        <Table aria-label="folder table">
          <TableHead>
            <TableRow>
              <TableCell>Folder Name</TableCell>
              <TableCell align="right">Owned By</TableCell>
              <TableCell align="right">Last Modified</TableCell>

              <TableCell align="right">Shared With</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((folder, idx) => (
                <TableRow
                  onClick={() => {
                    navigate(`/documents/${folder.documents[0].id}`);
                  }}
                  key={idx}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#a9a9a9",
                      color: "#000000",
                      transition:
                        "background-color 0.3s ease, box-shadow 0.3s ease",
                      boxShadow:
                        "0px 5px 15px rgba(0, 0, 0, 0.2)" /* horizontal offset, vertical offset, blur radius, and color */,
                    },
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {folder.text}
                  </TableCell>

                  <TableCell align="right">
                    {tableType === "shared"
                      ? folder.creator.name
                      : authDetails.name}
                  </TableCell>

                  <TableCell align="right">
                    {getDateDiff(folder.updatedAt)}
                  </TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }} align="right">
                    {folder.foldersAccessibleTo.map((person) => (
                      <Avatar key={person.id} {...stringAvatar(person.name)} />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        />
      </TableContainer>
    </Box>
  );
};

export default FolderTable;
