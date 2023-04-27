import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ marginTop: 8, minHeight: "100vh", alignItems: "center" }}>
      <Typography variant="h2" gutterBottom>
        401 Unauthorized
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Sorry, you do not have permission to access this page.
      </Typography>
      <Button onClick={() => navigate("/")} variant="contained">
        Go Home
      </Button>
    </Container>
  );
};

export default Unauthorized;
