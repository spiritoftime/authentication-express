import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
const GeneralAccess = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h6" component="h5">
        General access
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <LockOutlinedIcon
          sx={{
            fontSize: "2rem",
            borderRadius: "50%",
            padding: "2px 4px",
            color: "#1e1e1e",
            backgroundColor: "#868e96",
          }}
        />
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" component="h6">
            Restricted
          </Typography>
          <Typography variant="body1">
            Only people with access can open this link
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default GeneralAccess;
