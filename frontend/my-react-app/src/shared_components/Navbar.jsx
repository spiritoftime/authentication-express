import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import google_docs_logo from "../assets/google_docs_logo.png";
import { useAppContext } from "../../context/appContext";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { protectedApi } from "../services/makeProtectedRequest";
import { logout } from "../services/auth";
const Navbar = () => {
  const { authDetails, setAuthDetails } = useAppContext();
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

      protectedApi.interceptors.request.use((config) => {
        if (accessToken) {
          config.headers.Authorization = "";
        }
        return config;
      });
    },
  });
  const loggedIn = Object.keys(authDetails).length !== 0;
  return (
    <AppBar sx={{ backgroundColor: "#4285F4" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box
            component="img"
            src={google_docs_logo}
            alt="Logo"
            sx={{ height: "40px", width: "40px", objectFit: "cover" }}
          />
        </Link>
        <Box display="flex" alignItems="center">
          <Typography
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
              sx={{ marginRight: 2, textDecoration: "none", color: "inherit" }}
            >
              Profile
            </Typography>
          ) : (
            <Typography
              variant="body1"
              component={Link}
              to="/register"
              sx={{ marginRight: 2, textDecoration: "none", color: "inherit" }}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
