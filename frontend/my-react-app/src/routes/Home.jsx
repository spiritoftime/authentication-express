import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { useAppContext } from "../context/appContext";
import Hero from "../components/Hero";
import Features from "../components/Features";
const Home = () => {
  const { isDarkMode } = useAppContext();
  const theme = useTheme();
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
      <Features />
    </Box>
  );
};

export default Home;
