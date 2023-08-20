import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { GET_THREADS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import stringAvatar from "../../utils/avatarStyle";

export default function Threads({ open, setActiveThread }) {

  const handleSelect = (e) => {
    setActiveThread(e.target.closest("li").id);
  };

  const { loading, error, data } = useQuery(GET_THREADS);
  if (loading) {
    console.log("loading");
    return;
  }
  if (error) {
    if(error.message === "User is not authenticated") {
      localStorage.removeItem("auth_token")
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
            <Tooltip key={thread._id} title={open ? '' : thread.title} placement='right'>
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
                <ListItemText
                  primary={thread.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
          ))}
          <Tooltip title={open ? '' : 'New DudeMessage'} placement='right'>
          <ListItem
              key='new-dm-button'
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
                  primary='New DudeMessage'
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
      </List>
      {/* End Top Threads section */}
      <Divider />
      {/* Begin bottom threads */}
      <List>
        {data.threadsByUser
          .filter((thread) => !thread.isDM)
          .map((thread) => (
            <Tooltip key={thread._id} title={open ? '' : thread.title} placement='right'>
            <ListItem
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
                <ListItemText
                  primary={thread.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
          ))}
          <Tooltip title={open ? '' : 'New DudeGroup'} placement='right'>
          <ListItem
              key='new-group-button'
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
                  primary='New DudeGroup'
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
      </List>
      {/* End Bottom Threads section */}
    </>
  );
}
