import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { colors } from "../../theme/colors";
import { SidebarDrawer } from "../drawers/SidebarDrawer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { Outlet } from "react-router-dom";

export const OutletPage = () => {
  const sidebarDrawer = useVisibilityState();

  return (
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
  );
};
