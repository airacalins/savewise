import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { colors } from "../../theme/colors";
import { SidebarDrawer } from "../drawers/SidebarDrawer";
import { useVisibility } from "../../hooks/useVisibility";
import { Outlet } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const OutletPage = () => {
  const sidebarDrawer = useVisibility();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SidebarDrawer
          isOpen={sidebarDrawer.isVisible}
          onDrawerOpen={sidebarDrawer.show}
          onDrawerClose={sidebarDrawer.hide}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: colors.primary,
            display: "flex",
            flexGrow: 1,
            height: "100vh",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
