import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Demo from "../components/Demo";
import { useAppContext } from "../context/appContext";
import Hero from "../components/Hero";
import Features from "../components/Features";
import useScrollAnimation from "../customHooks/useScrollAnimation";
const LandingPage = () => {
  const { isDarkMode } = useAppContext();
  const theme = useTheme();
  useScrollAnimation();
  return (
    <Box
      sx={{
        overflowX: "hidden",
        backgroundColor: theme.palette.landingPage.primary,
      }}
      maxWidth="xl"
      display="flex"
      flexDirection="column"
    >
      <Hero />
      <Demo />
      <Features />
    </Box>
  );
};

export default LandingPage;
