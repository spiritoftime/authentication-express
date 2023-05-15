import React from "react";
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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FolderTable = ({ data, tableType, header }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { authDetails } = useAppContext();
  return (
    <Box>
      <Typography
        style={{
          color: theme.palette.landingPage.accent,

          fontWeight: 600,
        }}
        variant="h4"
      >
        {header}
      </Typography>
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
            {data.map((folder, idx) => (
              <TableRow
                onClick={() => {
                  navigate(`/documents/${folder.documents[0].id}`);
                }}
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
      </TableContainer>
    </Box>
  );
};

export default FolderTable;
