import React from "react";
import demo from "../assets/document-showcase.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
const Demo = () => {
  const theme = useTheme();
  return (
    <Box
      id="demo"
      sx={{
        textAlign: "center",
        padding: { xs: 2, s: 4, sm: "64px 64px 0 64px", lg: 8 },
      }}
      display="flex"
      flexDirection="column"
    >
      <Typography
        variant="h2"
        style={{
          color: theme.palette.landingPage.secondary,

          fontWeight: 600,
        }}
      >
        CommonDocs was created using the PERN stack, React Quill and
        React-tree-view.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={demo}
          alt="sample text editor"
          sx={{ width: { xs: "100%", md: "50%" } }}
        />

        <Typography
          sx={{
            textAlign: "left",
            position: "absolute",
            top: { xs: "25%" },
            left: { xs: "7%", md: "30%" },
          }}
          variant="body2"
          style={{
            color: theme.palette.landingPage.secondary,
            fontWeight: 600,
          }}
        >
          <span className="typing-animation">
            Hello there, how is your day going?
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Demo;
