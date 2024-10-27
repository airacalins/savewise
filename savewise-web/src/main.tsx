import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
