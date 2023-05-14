import React from "react";
import { useAppContext } from "../context/appContext";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LandingPage from "../assets/image-removebg-preview.png";
const Hero = () => {
  const { isDarkMode } = useAppContext();
  const theme = useTheme();
  return (
    <Box
      sx={{ padding: { xs: 2, s: 4, sm: "64px 64px 0 64px", lg: 8 } }}
      display="flex"
    >
      <Box
        gap={2}
        display="flex"
        sx={{
          alignItems: {
            xs: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{ textAlign: { xs: "center", md: "left" } }}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Typography
            variant="h2"
            style={{
              color: theme.palette.landingPage.secondary,

              fontWeight: 600,
            }}
          >
            Streamline Collaboration,{" "}
            <Typography
              variant="span"
              style={{
                color: theme.palette.landingPage.accent,
              }}
            >
              Elevate productivity
            </Typography>
          </Typography>
          <Typography
            style={{
              color: theme.palette.text.secondary,
              width: { xs: "100%", md: "70%" },
            }}
            variant="body1"
          >
            Unleash seamless collaboration and productivity with CommonDocs.
            Empower your team to work together effortlessly and achieve more.
          </Typography>
          <Box
            sx={{ justifyContent: { xs: "center", md: "unset" } }}
            display="flex"
            gap={2}
          >
            <Button
              sx={{
                borderRadius: "35px",
                bgcolor: theme.palette.landingPage.accent,
                "&:hover": {
                  bgcolor: theme.palette.landingPage.hover,
                },
                fontWeight: 600,
              }}
              variant="contained"
            >
              Sign Up
            </Button>
            <Button
              sx={{
                borderRadius: "35px",
                border: `1px solid ${theme.palette.landingPage.accent}`,
                bgcolor: theme.palette.landingPage.primary,
                color: theme.palette.landingPage.accent,
                "&:hover": {
                  bgcolor: isDarkMode ? "#1A1A1A" : "#EDEDED",
                },
                fontWeight: 600,
              }}
              variant="contained"
            >
              Learn More
            </Button>
          </Box>
        </Box>
        <Box>
          <img src={LandingPage} alt="demo CommonDocs" className="hero-img" />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
