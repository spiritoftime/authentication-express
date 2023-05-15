import React from "react";
import { useTheme } from "@mui/material/styles";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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
          border: `1px solid ${isDarkMode ? "#eee" : "#1f1f1f"}`,
          borderRadius: "15px",
          padding: 2,
          gap: 2,
        }}
        flexDirection="column"
      >
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            padding: 2,
            width: "fit-content",
            borderRadius: "15px",
          }}
        >
          <DragIndicatorIcon sx={{ color: "#fcfcfc" }} fontSize="large" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Simplify. Organize. Collaborate
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Effortlessly categorize your files using nested folders, allowing for
          easy management and quick access. Simplify your workflow by dragging
          and dropping documents with our intuitive interface.
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          border: `1px solid ${isDarkMode ? "#eee" : "#1f1f1f"}`,
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
          <ShareIcon sx={{ color: "#fcfcfc" }} fontSize="large" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Efficient Document Sharing
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Share documents effortlessly. CommonDocs enables easy sharing with
          specific individuals or groups, granting control over access
          permissions.
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          border: `1px solid ${isDarkMode ? "#eee" : "#1f1f1f"}`,
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
          <SecurityIcon sx={{ color: "#fcfcfc" }} fontSize="large" />
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
