import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { register, login } from "../services/auth";
import { useAppContext } from "../context/appContext";
import { api } from "../services/makeRequest";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const theme = createTheme();

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
    mutationFn: ({ username, password }) => {
      return register({ username, password });
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.user });
      const accessToken = res.headers.authorization.split(" ")[1];

      localStorage.setItem("accessToken", accessToken);
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
      setAuthDetails({ ...res.data.user });

      const accessToken = res.headers.authorization.split(" ")[1];

      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      navigate(from, { replace: true });
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username == null || password == null) return;
    if (isLogin) loginMutation({ username, password });
    else registerMutation({ username, password });
    // navigate to profile or something after that
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              <Grid onClick={() => navigate(isLogin ? "/register" : "/login")}>
                {isLogin ? (
                  <Link variant="body2">Don't have an account? Sign Up</Link>
                ) : (
                  <Link variant="body2">Already have an account? Sign In</Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
