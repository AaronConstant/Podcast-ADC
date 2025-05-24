import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import {theme} from "./Styling/theme.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
        <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
