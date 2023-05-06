import React from "react";
import Box from "@mui/material/Box";
import { stringAvatar } from "../helper_functions/muiAvatar";
import Avatar from "@mui/material/Avatar";
import { useAppContext } from "../context/appContext";
const ActiveUsers = ({ users }) => {
  const { authDetails } = useAppContext();
  return (
    <Box display="flex" gap={2}>
      {users &&
        users.map((user, idx) => {
          if (user !== authDetails.username) {
            return <Avatar key={idx} {...stringAvatar(user)} />;
          }
        })}
    </Box>
  );
};
export default ActiveUsers;
