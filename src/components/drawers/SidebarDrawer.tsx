import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Home, MoneyOff, Savings } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface SideNavProps {
  key: string;
  name: string;
  link: string;
  icon: React.ReactNode;
}

const sideNavs = [
  {
    key: "home",
    name: "Home",
    link: "/",
    icon: <Home />,
  },
  {
    key: "funds",
    name: "Funds",
    link: "/fundsCollection",
    icon: <Savings />,
  },
  {
    key: "expenses",
    name: "Expenses",
    link: "/expensesCollection",
    icon: <MoneyOff />,
  },
];

interface SidebarDrawerProps {
  isOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onDrawerOpen,
  onDrawerClose,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedNavKey, setSelectedNavKey] = React.useState(sideNavs[0].key);

  //   Functions
  const handleNavigate = (sideNav: SideNavProps) => {
    setSelectedNavKey(sideNav.key);
    navigate(sideNav.link);
  };

  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        {isOpen ? (
          <IconButton onClick={onDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        ) : (
          <IconButton aria-label="open drawer" onClick={onDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {sideNavs.map((sideNav) => (
          <ListItem key={sideNav.key} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedNavKey === sideNav.key}
              onClick={() => handleNavigate(sideNav)}
              sx={[
                { minHeight: 48, px: 2.5 },
                { justifyContent: isOpen ? "initial" : "center" },
              ]}
            >
              <ListItemIcon
                onClick={() => handleNavigate(sideNav)}
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  { mr: isOpen ? 3 : "auto" },
                ]}
              >
                {sideNav.icon}
              </ListItemIcon>
              <ListItemText
                primary={sideNav.name}
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
