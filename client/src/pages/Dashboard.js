import { useState, useEffect, } from "react";
import {useSearchParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Threads from "../components/Dashboard/Threads";
import MessagesWithData from "../components/Dashboard/Messages";
import AddMessage from "../components/Dashboard/AddMessage";
import { useUserContext } from "../utils/userContext";
import FormModal from "../components/Dashboard/FormModal";

const drawerWidth = 400;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  //Want to get things like active thread into the URL
  //So it can persist when there is a re-render 
  //due to theme switch
  const [params, setParams] = useSearchParams();
  const currentParams = Object.fromEntries([...params])
  const currentThread = currentParams.threadId ? currentParams.threadId : ''
  const [activeThread, setActiveThread] = useState(currentThread);
  const { userLogged, setUserLogged, currentUser, currentTheme, setCurrentTheme } = useUserContext();
  const [modalInfo, setModalInfo] = useState({form: null, show:false});
  const handleModalOpen = (Component) => {
    setModalInfo({form: Component, show:true})
  };
  const handleModalClose = () => {
    setModalInfo({form: null, show: false})
  };

  useEffect(() => {
    if ((!localStorage.getItem("auth_token") && userLogged) || !currentUser) {
      console.log("firing laser");
      setUserLogged(false);
    }
  });

  useEffect(()=>{
    const currentParams = Object.fromEntries([...params])
    if(currentParams.threadId !== activeThread) {
      setActiveThread(currentParams.threadId)
    }
  }, [params])

  const userName = currentUser?.username;

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    setUserLogged(false);
  };

  const toggleTheme = () => {
    const newTheme = Math.abs(currentTheme - 1)
    setCurrentTheme(newTheme)
  }

  const theme = useTheme();
  
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome to DudesChat
          </Typography>
          {/* vv User and Logout buttons vv */}
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={toggleTheme}>{userName || "Who?"}</Button>
            <Button variant="contained" onClick={handleLogOut}>
              Log Out
            </Button>
          </Stack>
          {/* ^^ User and Logout buttons ^^ */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Begin top Threads Section */}
        <Threads open={open} handleModalOpen={handleModalOpen} />
        {/* Begin bottom threads */}
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 3,
          maxHeight: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{overflow: "auto", }}>
          <DrawerHeader />
          {/* Begin Messages Area */}
          {activeThread && userLogged && (
            <MessagesWithData activeThread={activeThread} />
          )}
        </div>
        {modalInfo.form && <FormModal
          showModal={modalInfo.show}
          setModalInfo={setModalInfo}
          handleModalClose={handleModalClose}
          ModalForm={modalInfo.form}
          />}
        {/* End Messages Area */}
        {activeThread && userLogged && (
          <AddMessage activeThread={activeThread} />
        )}
      </Box>
    </Box>
  );
}
