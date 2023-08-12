import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useUserContext } from "../../utils/userContext";
import { useEffect } from "react";
import stringAvatar from "../../utils/avatarStyle";


export default function Messages({ activeThread }) {
  const {setUserLogged} = useUserContext()

  useEffect(()=>{
    if(!localStorage.getItem("auth_token")){
      console.log("begone from this place fiend")
      setUserLogged(false)
    }
  })

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
    }
    console.log(error);
    return;
  }
  if (data.messagesByThread.length === 0) return (<div key='None'>No Messages in This Thread</div>)
  else {return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.messagesByThread.map((message) => (
          <div key={message._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar {...stringAvatar(message.authorId.username)} />
              </ListItemAvatar>
              <ListItemText
                primary={message.authorId.username + " @ " + message.updatedAt}
                secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >
                      {message.messageBody}
                    </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      {/* End Messages Area */}
      </List>
  )}
}
