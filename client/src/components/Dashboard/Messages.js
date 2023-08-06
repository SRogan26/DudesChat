import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";

export default function Messages({ activeThread }) {
  const {setUserLogged} = useUserContext()

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { threadId: activeThread },
  });
  if (loading) {
    console.log("loading");
    return;
  }
  if (error) {
    if(error.message === "User is not authenticated") {
      localStorage.removeItem("auth_token")
      return <Navigate to='/'/>;
    }
    console.log(error);
    return;
  }

  return (
    <>
      {/* Begin Messages Area */}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.messagesByThread.map((message) => (
          <div key={message._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={message.authorId} src={message.authorId} />
              </ListItemAvatar>
              <ListItemText
                primary={"Dude-" + message.authorId + " @ " + message.updatedAt}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {message.messageBody}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      {/* End Messages Area */}
    </>
  );
}
