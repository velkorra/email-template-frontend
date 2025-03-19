import React from "react";
import "./index.css";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { TemplateProvider } from "./context/TemplateContext";
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TemplateProvider>
          <App />
        </TemplateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
