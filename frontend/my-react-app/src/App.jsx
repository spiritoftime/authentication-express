import { useState, useEffect } from "react";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./shared_components/Navbar";
import AuthForm from "./shared_components/AuthForm";
import Profile from "./routes/Profile";
import { persistLogin } from "./services/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../context/appContext";
function App() {
  const { setAuthDetails } = useAppContext();
  const { mutate: persistLoginMutation } = useMutation({
    mutationFn: (accessToken) => {
      return persistLogin(accessToken);
    },
    onSuccess: (res) => {
      setAuthDetails({ ...res.data.user });
      const accessToken = res.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
      protectedApi.interceptors.request.use((config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      });
    },
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      persistLoginMutation(accessToken);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
