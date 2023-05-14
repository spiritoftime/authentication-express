import React from "react";
import { useTheme } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import SecurityIcon from "@mui/icons-material/Security";
import { useAppContext } from "../context/appContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const Features = () => {
  const theme = useTheme();
  const { isDarkMode } = useAppContext();
  return (
    <Box
      sx={{
        padding: { xs: "0px 16px 16px", s: "0 32px 32px", sm: 8 },
        flexDirection: { xs: "column", md: "row" },
      }}
      gap={2}
      display="flex"
    >
      <Box
        display="flex"
        sx={{
          border: "1px solid #eee",
          borderRadius: "15px",
          padding: 2,
          gap: 2,
        }}
        flexDirection="column"
      >
        <Box
          sx={{
            backgroundColor: "#1F1F1F",
            padding: 2,
            width: "fit-content",
            borderRadius: "15px",
          }}
        >
          <CreateIcon fontSize="large" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Real-Time Editing and Comments
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Collaborate effectively with real-time editing and commenting
          features. Make suggestions, provide feedback, and track changes within
          the document.
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          border: "1px solid #eee",
          borderRadius: "15px",
          padding: 2,
          gap: 2,
        }}
        flexDirection="column"
      >
        <Box
          sx={{
            backgroundColor: "#1F1F1F",
            padding: 2,
            width: "fit-content",
            borderRadius: "15px",
          }}
        >
          <ShareIcon fontSize="large" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Efficient Document Sharing
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Share documents effortlessly. Our Google Docs clone enables easy
          sharing with specific individuals or groups, granting control over
          access permissions.
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          border: "1px solid #eee",
          borderRadius: "15px",
          padding: 2,
          gap: 2,
        }}
        flexDirection="column"
      >
        <Box
          sx={{
            backgroundColor: "#1F1F1F",
            padding: 2,
            width: "fit-content",
            borderRadius: "15px",
          }}
        >
          <SecurityIcon fontSize="large" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Enhanced Security Features
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Rest assured knowing your documents are safe. CommonDocs employs
          robust security measures, including refresh tokens and access
          controls.
        </Typography>
      </Box>
    </Box>
  );
};

export default Features;
