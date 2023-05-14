import { useState, useEffect } from "react";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./shared_components/Navbar";

import Profile from "./routes/Profile";
import usePersistLogin from "./customHooks/usePersistLogin";
import Redirect from "./routes/Redirect";
import TextEditor from "./routes/TextEditor";

import ProtectedRoute from "./shared_components/ProtectedRoute";
import Auth from "./routes/Auth";
import Unauthorized from "./routes/Unauthorized";
import { useAppContext } from "./context/appContext";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme";

function App() {
  usePersistLogin();
  const { isDarkMode } = useAppContext();
  return (
    <ThemeProvider
      theme={
        isDarkMode
          ? responsiveFontSizes(darkTheme)
          : responsiveFontSizes(lightTheme)
      }
    >
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/createDocument"
            element={
              <ProtectedRoute>
                <Redirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/:id"
            element={
              <ProtectedRoute>
                <TextEditor />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
