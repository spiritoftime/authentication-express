import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../helper_functions/muiAvatar";
import NightlightIcon from "@mui/icons-material/Nightlight";
import darkLogo from "../assets/common_docs_dark.png";
const Navbar = () => {
  const {
    authDetails,
    setAuthDetails,

    setIsDarkMode,
    isDarkMode,
  } = useAppContext();
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
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
      api.defaults.headers.common["Authorization"] = null;
    },
  });
  const loggedIn = Object.keys(authDetails).length !== 0;

  return (
    <AppBar
      position="sticky"
      sx={{ top: 0, backgroundColor: theme.palette.landingPage.primary }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src={isDarkMode ? darkLogo : google_docs_logo}
              alt="Logo"
              sx={{ height: "40px", width: "40px", objectFit: "cover" }}
            />
          </Link>
          <Typography
            sx={{
              display: {
                xs: "none",
                s: "none",
                sm: "block",
              },
              color: theme.palette.text.primary,
            }}
            variant="body1"
            component="p"
          >
            CommonDocs
          </Typography>
        </Box>
        {
          <Box
            display="flex"
            alignItems="center"
            sx={{ gap: { xs: 0, s: "16px" } }}
          >
            <IconButton
              onClick={toggleTheme}
              aria-label="toggle color mode"
              component="label"
            >
              {isDarkMode ? <NightlightIcon /> : <LightModeIcon />}
            </IconButton>

            {loggedIn ? (
              <Avatar {...stringAvatar(authDetails.name)} />
            ) : (
              <Typography
                variant="body1"
                component={Link}
                to="/register"
                sx={{
                  marginRight: 2,
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Register
              </Typography>
            )}
            {loggedIn ? (
              <>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/home"
                  sx={{
                    marginRight: 2,
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  Overview
                </Typography>
                <Button
                  component="a"
                  size={isSmDown ? "small" : "medium"}
                  onClick={() => logoutMutation(authDetails.id)}
                  href="#demo"
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
                  Logout
                </Button>
              </>
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
