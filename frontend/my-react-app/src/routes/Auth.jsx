import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useMutation } from "@tanstack/react-query";
import { register, login } from "../services/auth";
import { useAppContext } from "../context/appContext";
import { api } from "../services/makeRequest";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Auth({ isLogin }) {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { authDetails, setAuthDetails } = useAppContext();

  const navigate = useNavigate();
  const {
    mutate: registerMutation,
    error: registerError,
    isError: isRegisterError,
  } = useMutation({
    mutationFn: ({ username, password, name }) => {
      return register({ username, password, name });
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });
      const accessToken = res.headers.authorization.split(" ")[1];

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      navigate(from, { replace: true });
    },
  });

  const {
    mutate: loginMutation,
    error: loginError,
    isError: isLoginError,
  } = useMutation({
    mutationFn: ({ username, password }) => {
      return login({ username, password });
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.userWithDocuments });

      const accessToken = res.headers.authorization.split(" ")[1];

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      navigate(from, { replace: true });
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin && (username == null || password == null)) return;
    if (!isLogin && (username == null || password == null || name == null))
      return;
    if (isLogin) loginMutation({ username, password });
    else registerMutation({ username, password, name });
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isLogin ? "Sign in" : "Sign Up"}
      </Typography>
      <Box
        paddingX={2}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        {!isLogin && (
          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            label="Name"
            type="name"
            id="name"
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="Username"
          label="Username"
          name="Username"
          autoComplete="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {isRegisterError && (
          <Typography variant="body1" sx={{ color: "#FF0000" }}>
            {registerError}
          </Typography>
        )}
        {isLoginError && (
          <Typography variant="body1" sx={{ color: "#FF0000" }}>
            {loginError}
          </Typography>
        )}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          >
            {isLogin ? (
              <Link variant="body2">Don't have an account? Sign Up</Link>
            ) : (
              <Link variant="body2">Already have an account? Sign In</Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
