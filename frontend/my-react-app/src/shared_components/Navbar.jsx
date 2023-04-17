import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import google_docs_logo from "../assets/google_docs_logo.png";
const Navbar = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
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
        <Box>
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
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Profile
            </Typography>
          ) : (
            <Typography
              variant="body1"
              component={Link}
              to="/register"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Register
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
