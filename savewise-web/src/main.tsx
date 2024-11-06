import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./theme/toastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
