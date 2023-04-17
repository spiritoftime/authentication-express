import { useState } from "react";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./shared_components/Navbar";
import AuthForm from "./shared_components/AuthForm";
import Profile from "./routes/Profile";
function App() {
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
