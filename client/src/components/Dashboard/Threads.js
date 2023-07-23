import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { GET_THREADS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function Threads({open}) {
  const { loading, error, data } = useQuery(GET_THREADS);
  if (loading) {
    console.log("loading");
    return;
  }
  if (error) {
    console.log(error);
    return;
  }
  
  return (
    <>
      <List>
        {data.threadsByUser.filter(thread => thread.isDM).map((thread) => (
          <ListItem key={thread._id} disablePadding sx={{ display: "block" }}>
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
                <Avatar alt={thread.title} src={null}/>
              </ListItemAvatar>
              <ListItemText primary={thread.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* End Top Threads section */}
      <Divider />
      {/* Begin bottom threads */}
      <List>
        {data.threadsByUser.filter(thread => !thread.isDM).map((thread) => (
          <ListItem key={thread._id} disablePadding sx={{ display: "block" }}>
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
                <Avatar alt={thread.title} src={null}/>
              </ListItemAvatar>
              <ListItemText primary={thread.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* End Bottom Threads section */}
    </>
  );
}
