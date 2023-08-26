import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { GET_THREADS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import stringAvatar from "../../utils/avatarStyle";
import DMForm from "./FormModal/DMForm";
import { useEffect } from "react";

function Thread({ thread, open, setActiveThread }) {
  const handleSelect = (e) => {
    setActiveThread(e.target.closest("li").id);
  };

  return (
    <Tooltip title={open ? "" : thread.title} placement="right">
      <ListItem
        key={thread._id}
        id={thread._id}
        onClick={handleSelect}
        disablePadding
        sx={{ display: "block" }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemAvatar
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Avatar {...stringAvatar(thread.title)} />
          </ListItemAvatar>
          <ListItemText primary={thread.title} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

function AddThread({ title, open, handleModalOpen, FormComponent }) {
  return (
    <Tooltip title={open ? "" : `New ${title}`} placement="right">
      <ListItem
        key={`new-${title}-button`}
        disablePadding
        sx={{ display: "block" }}
        onClick={() => handleModalOpen(FormComponent)}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AddIcon />
          </ListItemIcon>
          <ListItemText
            primary={`New ${title}`}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

export default function Threads({ open, setActiveThread, handleModalOpen }) {
  useEffect(() => {
    const pollingInt = setInterval(() => refetch(), 2000);
    return (() => {
      clearInterval(pollingInt);
    });
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_THREADS, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    console.log("loading");
    return;
  }
  if (error) {
    if (error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
      localStorage.removeItem("auth_token");
    }
    console.log(error);
    return;
  }

  return (
    <>
      <List>
        {data.threadsByUser
          .filter((thread) => thread.isDM)
          .map((thread) => (
            <Thread
              key={thread._id}
              thread={thread}
              open={open}
              setActiveThread={setActiveThread}
            />
          ))}
        <AddThread
          open={open}
          title="DudeMessage"
          handleModalOpen={handleModalOpen}
          FormComponent={DMForm}
        />
      </List>
      {/* End Top Threads section */}
      <Divider />
      {/* Begin bottom threads */}
      <List>
        {data.threadsByUser
          .filter((thread) => !thread.isDM)
          .map((thread) => (
            <Thread
              key={thread._id}
              thread={thread}
              open={open}
              setActiveThread={setActiveThread}
            />
          ))}
        <AddThread
          open={open}
          title="DudeGroup"
          handleModalOpen={handleModalOpen}
        />
      </List>
      {/* End Bottom Threads section */}
    </>
  );
}
