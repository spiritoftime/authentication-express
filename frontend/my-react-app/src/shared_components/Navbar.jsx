import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import google_docs_logo from "../assets/google_docs_logo.png";
import { useAppContext } from "../context/appContext";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/makeRequest";
import { logout } from "../services/auth";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
const Navbar = () => {
  const {
    authDetails,
    setAuthDetails,
    isLoadingAuth,
    setIsDarkMode,
    isDarkMode,
  } = useAppContext();
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  const {
    mutate: logoutMutation,
    error: logoutError,
    isError: isLogoutError,
  } = useMutation({
    mutationFn: (userId) => {
      return logout(userId);
    },
    onSuccess: (res) => {
      setAuthDetails({});
      localStorage.removeItem("accessToken");
      api.defaults.headers.common["Authorization"] = null;
    },
  });
  const loggedIn = Object.keys(authDetails).length !== 0;

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box
            component="img"
            src={google_docs_logo}
            alt="Logo"
            sx={{ height: "40px", width: "40px", objectFit: "cover" }}
          />
        </Link>
        {
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={toggleTheme}
              aria-label="toggle color mode"
              component="label"
            >
              {isDarkMode ? <NightlightIcon /> : <LightModeIcon />}
            </IconButton>
            <Typography
              onClick={() =>
                setAuthDetails((prev) => ({ ...prev, isNewDocument: true }))
              }
              variant="body1"
              component={Link}
              to="/createDocument"
              sx={{ marginRight: 2, textDecoration: "none", color: "inherit" }}
            >
              Create Document
            </Typography>
            <Typography
              variant="body1"
              component={Link}
              to="/joinDocument"
              sx={{ marginRight: 2, textDecoration: "none", color: "inherit" }}
            >
              Join Document
            </Typography>
            {loggedIn ? (
              <Typography
                variant="body1"
                component={Link}
                to="/profile"
                sx={{
                  marginRight: 2,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Profile
              </Typography>
            ) : (
              <Typography
                variant="body1"
                component={Link}
                to="/register"
                sx={{
                  marginRight: 2,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Register
              </Typography>
            )}
            {loggedIn ? (
              <Button
                onClick={() => logoutMutation(authDetails.id)}
                variant="contained"
              >
                Logout
              </Button>
            ) : (
              ""
            )}
          </Box>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
