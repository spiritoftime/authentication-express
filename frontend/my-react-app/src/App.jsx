import { useState } from "react";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./shared_components/Navbar";
function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
